//
//  led_effect.js
//  JVSPiGlow
//
//  Created by Joris Vervuurt on 18-07-15.
//  Copyright (c) 2015 Joris Vervuurt Software. All rights reserved.
//

//  The MIT License (MIT)
//
//  Copyright (c) 2015 Joris Vervuurt Software
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.

'use strict';

// Define dependencies.
var JVSPiGlow = null,
    EventEmitter = require('events').EventEmitter,
    util = require('util');

// Define variables.
var isRunning = false,
    effectInterval = null,
    effectTimeout = null,
    currentState = null,
    updateInterval = 0,
    currentCycleCount = 0;

/**
 * Creates a new `LEDEffect` object.
 * @constructor
 * @param {LED|LEDCollection} ledOrLedCollection The `LED` or `LEDCollection` to include in the effect.
 * @param {Object} options The options to use for the effect.
 *   @param {Number} mode The effect mode (`JVSPiGlow.EFFECT_FADE` or `JVSPiGlow.EFFECT_PULSE`).
 *   @param {Number} targetBrightness The target brightness (between 0 and 255) that will be applied to all LEDs included in the effect.
 *   @param {Number} [duration] The fade duration. Required if the effect mode is `EFFECT_FADE`.
 *   @param {Number} [cycleDelay] The delay between each cycle. Required if the effect mode is `EFFECT_PULSE`.
 *   @param {Number} [cycleFadeDuration=0] The fade duration of each cycle, used when the effect mode is `EFFECT_PULSE`. 0 means no fade. Optional (0 by default).
 *   @param {Number} [repeatCount=0] The pulse count, used when the effect mode is `EFFECT_PULSE`. 0 means infinite. Optional (0 by default).
 */
function LEDEffect(ledOrLedCollection, options) {
    if (!(this instanceof LEDEffect)) {
        return new LEDEffect(ledOrLedCollection, options);
    }
    
    if (!options) {
        throw new Error('No options specified.');
    } else {
        if (!(typeof options.mode === 'number') || !(options.mode === JVSPiGlow.EFFECT_FADE || options.mode === JVSPiGlow.EFFECT_PULSE)) {
            throw new Error('The specified effect mode is invalid.');
        }
        
        if (!(typeof options.targetBrightness === 'number') || options.targetBrightness < 0 || options.targetBrightness > 255) {
            throw new Error('The specified target brightness is invalid (should be between 0 and 255).');
        }
        
        if (options.mode === JVSPiGlow.EFFECT_FADE) {
            if (!(typeof options.duration === 'number') || options.duration <= 0) {
                throw new Error('The specified duration is invalid.');
            }
        } else if (options.mode === JVSPiGlow.EFFECT_PULSE) {
            if (!(typeof options.cycleDelay === 'number') || options.cycleDelay <= 0) {
                throw new Error('The specified cycle delay is invalid.');
            }
            
            if (typeof options.cycleFadeDuration === 'number') {
                if (options.cycleFadeDuration < 0) {
                    throw new Error('The specified cycle fade duration is invalid.');
                }
            } else {
                options.cycleFadeDuration = 0;
            }
            
            if (typeof options.repeatCount === 'number') {
                if (options.repeatCount < 0) {
                    throw new Error('The specified repeat count is invalid.');
                }
            } else {
                options.repeatCount = 0;
            }
        }
    }
    
    this.initialState = JVSPiGlow.LEDCollection([ledOrLedCollection]);
    this.options = options;
    
    EventEmitter.call(this);
}

// Inherit the prototype methods of `EventEmitter`.
util.inherits(LEDEffect, EventEmitter);

/**
 * Starts the effect.
 */
LEDEffect.prototype.start = function() {
    if (isRunning || effectInterval || effectTimeout) {
        throw new Error('Attempting to start a LEDEffect that is already running or attempting to start a LEDEffect while another LEDEffect is still running.');
    }
    
    isRunning = true;
    currentState = this.initialState.clone();
    
    var minInitialBrightness = 0;
    var maxInitialBrightness = 0;
    
    for (var i = 0; i < this.initialState.items.length; i++) {
        var led = this.initialState.items[i];
        
        if (minInitialBrightness === 0 || led.brightness < minInitialBrightness) {
            minInitialBrightness = led.brightness;
        }
        
        if (maxInitialBrightness === 0 || led.brightness > maxInitialBrightness) {
            maxInitialBrightness = led.brightness;
        }
    }
    
    var stepsFromMinInitialToTarget = Math.abs(this.options.targetBrightness - minInitialBrightness);
    var stepsFromMaxInitialToTarget = Math.abs(this.options.targetBrightness - maxInitialBrightness);
    
    if (this.options.mode === JVSPiGlow.EFFECT_FADE) {
        updateInterval = Math.ceil(this.options.duration / Math.max(stepsFromMinInitialToTarget, stepsFromMaxInitialToTarget));
    } else if (this.options.mode === JVSPiGlow.EFFECT_PULSE) {
        updateInterval = Math.ceil(this.options.cycleFadeDuration / Math.max(stepsFromMinInitialToTarget, stepsFromMaxInitialToTarget));
    }
    
    JVSPiGlow.currentlyRunningEffect = this;
    
    this.emit('started');
    
    if (this.options.mode === JVSPiGlow.EFFECT_FADE) {
        var effect = this;
        
        fade(this, this.options, function() {
            reset();
            
            effect.emit('finished');
        });
    } else if (this.options.mode === JVSPiGlow.EFFECT_PULSE) {
        pulse(this, this.options, false);
    }
    
    return this;
};

/**
 * Stops the effect.
 * @param {Function} [callback] A function to call when the effect has stopped. Optional.
 */
LEDEffect.prototype.stop = function(callback) {
    if (!isRunning) {
        throw new Error('Attempting to stop a LEDEffect that is not running.');
    }
    
    if (effectInterval) {
        clearInterval(effectInterval);
    }
    
    if (effectTimeout) {
        clearTimeout(effectTimeout);
    }
    
    var effect = this;
    
    fade(this, this.options, function() {
        reset();
        
        effect.emit('stopped');
        
        if (callback) {
            callback();
        }
    }, true);
    
    return this;
};

var effectLeds = null;

/**
 * Starts a fade effect.
 * @private
 * @param {LEDEffect} effect The `LEDEffect` object that requested the fade effect.
 * @param {Object} options The options to use for the effect.
 *   @param {Number} mode The effect mode (`JVSPiGlow.EFFECT_FADE` or `JVSPiGlow.EFFECT_PULSE`).
 *   @param {Number} targetBrightness The target brightness (between 0 and 255) that will be applied to all LEDs included in the effect.
 *   @param {Number} [duration] The fade duration. Required if the effect mode is `EFFECT_FADE`.
 *   @param {Number} [cycleDelay] The delay between each cycle. Required if the effect mode is `EFFECT_PULSE`.
 *   @param {Number} [cycleFadeDuration=0] The fade duration of each cycle, used when the effect mode is `EFFECT_PULSE`. 0 means no fade. Optional (0 by default).
 *   @param {Number} [repeatCount=0] The pulse count, used when the effect mode is `EFFECT_PULSE`. 0 means infinite. Optional (0 by default).
 * @param {Function} callback A function to call when the fade effect has finished.
 * @param {Boolean} [targetIsInitialBrightness] A flag that indicates whether the target brightness should be the initial brightness. Optional.
 */
var fade = function(effect, options, callback, targetIsInitialBrightness) {    
    effectInterval = setInterval(function() {
        var finished = true;
        
        for (var i = 0; i < currentState.items.length; i++) {
            var led = currentState.items[i];
            
            var targetBrightness = !targetIsInitialBrightness ? options.targetBrightness : effect.initialState.items[i].brightness;
            var fadeIn = (targetBrightness > led.brightness);
            
            if (fadeIn) {
                if (led.brightness < targetBrightness) {
                    finished = false;
                    led.brightness++;
                }
            } else {
                if (led.brightness > targetBrightness) {
                    finished = false;
                    led.brightness--;
                }
            }
        }
        
        currentState.set();
        
        if (finished) {
            clearInterval(effectInterval);
            callback();
        }
    }, updateInterval);
};

/**
 * Starts a pulse effect.
 * @private
 * @param {LEDEffect} effect The `LEDEffect` object that requested the pulse effect.
 * @param {Object} options The options to use for the effect.
 *   @param {Number} mode The effect mode (`JVSPiGlow.EFFECT_FADE` or `JVSPiGlow.EFFECT_PULSE`).
 *   @param {Number} targetBrightness The target brightness (between 0 and 255) that will be applied to all LEDs included in the effect.
 *   @param {Number} [duration] The fade duration. Required if the effect mode is `EFFECT_FADE`.
 *   @param {Number} [cycleDelay] The delay between each cycle. Required if the effect mode is `EFFECT_PULSE`.
 *   @param {Number} [cycleFadeDuration=0] The fade duration of each cycle, used when the effect mode is `EFFECT_PULSE`. 0 means no fade. Optional (0 by default).
 *   @param {Number} [repeatCount=0] The pulse count, used when the effect mode is `EFFECT_PULSE`. 0 means infinite. Optional (0 by default).
 * @param {Boolean} targetIsInitialBrightness A flag that indicates whether the initial and target brightness values should be inverted.
 */
var pulse = function(effect, options, targetIsInitialBrightness) {
    var shouldStartCycle = true;
    
    if (options.repeatCount > 0) {
        shouldStartCycle = (currentCycleCount < (options.repeatCount * 2));
    }
    
    if (shouldStartCycle) {
        fade(effect, options, function() {
            currentCycleCount++;
            
            effectTimeout = setTimeout(function() {
                pulse(effect, options, !targetIsInitialBrightness);
            }, options.cycleDelay);
        }, targetIsInitialBrightness);
    } else {
        reset();
        
        effect.emit('finished');
    }
}

/**
 * Resets all global effect variables.
 * @private
 */
var reset = function() {
    isRunning = false,
    effectInterval = null,
    effectTimeout = null,
    currentState = null,
    updateInterval = 0,
    currentCycleCount = 0;
    
    JVSPiGlow.currentlyRunningEffect = null;
};

// Exports the `LEDEffect` object.
module.exports = function(jvsPiGlow) {
    JVSPiGlow = jvsPiGlow;
    
    return LEDEffect;
};
