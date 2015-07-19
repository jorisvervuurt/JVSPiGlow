//
//  led.js
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
var JVSPiGlow = null;

/**
 * Creates a new `LED` object.
 * @constructor
 * @param {Number} position The position of the LED (between 1 and 18).
 * @param {Number} [brightness=0] The brightness of the LED (between 0 and 255). Optional (0 by default). 
 */
function LED(position, brightness) {
    if (!(this instanceof LED)) {
        return new LED(position, brightness);
    }
    
    if ((typeof position !== 'number') || position < 1 || position > 18) {
        throw new Error('The specified LED position is invalid (should be between 1 and 18).');
    }
    
    var brightnessSpecified = (typeof brightness === 'number');
    
    if (brightnessSpecified && (brightness < 0 || brightness > 255)) {
        throw new Error('The specified brightness value is invalid (should be between 0 and 255).');
    }
    
    this.position = position;
    this.brightness = brightnessSpecified ? brightness : 0;
}

/**
 * Sets the brightness of the LED.
 * @param {Number} brightness The brightness of the LED (between 0 and 255).
 * @returns {LED} The updated `LED` object.
 */
LED.prototype.setBrightness = function(brightness) { 
    if ((typeof brightness !== 'number') || brightness < 0 || brightness > 255) {
        throw new Error('The specified brightness value is invalid (should be between 0 and 255).');
    }
    
    this.brightness = brightness;
    
    return this;
};

/**
 * Updates the PiGlow to reflect the state of the LED.
 */
LED.prototype.set = function() {
    JVSPiGlow.set(this);
};

/**
 * Creates a new `LEDEffect` object for the LED.
 * @param {Object} options The options to use for the effect.
 *   @param {Number} mode The effect mode (`JVSPiGlow.EFFECT_FADE` or `JVSPiGlow.EFFECT_PULSE`).
 *   @param {Number} targetBrightness The target brightness (between 0 and 255) that will be applied to all LEDs included in the effect.
 *   @param {Number} [duration] The fade duration. Required if the effect mode is `EFFECT_FADE`.
 *   @param {Number} [cycleDelay] The delay between each cycle. Required if the effect mode is `EFFECT_PULSE`.
 *   @param {Number} [cycleFadeDuration=0] The fade duration of each cycle, used when the effect mode is `EFFECT_PULSE`. 0 means no fade. Optional (0 by default).
 *   @param {Number} [repeatCount=0] The pulse count, used when the effect mode is `EFFECT_PULSE`. 0 means infinite. Optional (0 by default).
 */
LED.prototype.effect = function(options) {
    return JVSPiGlow.LEDEffect(this, options);
};

/**
 * Clones the `LED` object.
 * @returns {LED} The cloned `LED` object.
 */
LED.prototype.clone = function() {
    return JVSPiGlow.LED(this.position, this.brightness);
};

// Exports the `LED` object.
module.exports = function(jvsPiGlow) {
    JVSPiGlow = jvsPiGlow;
    
    return LED;
};
