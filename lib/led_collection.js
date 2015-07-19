//
//  led_collection.js
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
 * Creates a new `LEDCollection` object.
 * @constructor
 * @param {Array} [led=[]] An array that contains LED positions and/or `LED` objects and/or `LEDCollection` objects. Optional (you may add LED objects to the items array directly).
 * @param {Number} [defaultBrightness=0] The default brightness (between 0 and 255). Optional (0 by default). 
 */
function LEDCollection(leds, defaultBrightness) {
    if (!(this instanceof LEDCollection)) {
        return new LEDCollection(leds, defaultBrightness);
    }
    
    var defaultBrightnessSpecified = (typeof defaultBrightness === 'number');
    
    if (defaultBrightnessSpecified && (defaultBrightness < 0 || defaultBrightness > 255)) {
        throw new Error('The specified default brightness value is invalid (should be between 0 and 255).');
    }
    
    this.items = [];
    this.defaultBrightness = defaultBrightnessSpecified ? defaultBrightness : 0;

    if (Array.isArray(leds)) {
        for (var i = 0; i < leds.length; i++) {
            var item = leds[i];
            
            if (item instanceof JVSPiGlow.LEDCollection) {
                this.items = this.items.concat(item.clone().items);
            } else if (item instanceof JVSPiGlow.LED) {
                this.items.push(item.clone());
            } else if (Array.isArray(item)) {
                this.items = this.items.concat(JVSPiGlow.LEDCollection(item, defaultBrightness).items);
            } else if (typeof item === 'number') {
                this.items.push(JVSPiGlow.LED(item, defaultBrightness));
            } else {
                throw new Error('The specified array of LED positions and/or LED objects and/or LEDCollection objects contains invalid items.');
            }
        }
    }
}

/**
 * Sets the brightness of all LEDs in the collection or sets the brightness of a specific LED.
 * @param {Number} brightness The brightness of the LED/LEDs (between 0 and 255).
 * @param {Number} [ledPosition] The position of a specific led (between 1 and 18). Optional (omitting results in the brightness being set for all LEDs).
 * @returns {LEDCollection} The updated `LEDCollection` object.
 */
LEDCollection.prototype.setBrightness = function(brightness, ledPosition) {
    if (!(typeof brightness === 'number') || brightness < 0 || brightness > 255) {
        throw new Error('The specified brightness value is invalid (should be between 0 and 255).');
    }
    
    var ledPositionSpecified = (typeof ledPosition === 'number');
    
    if (ledPositionSpecified && (ledPosition < 1 || ledPosition > 18)) {
        throw new Error('The specified LED position is invalid (should be between 1 and 18).');
    }
    
    this.items.forEach(function(item) {
        if (ledPositionSpecified) {
            if (item.position === ledPosition) {
                item.brightness = brightness;
            }
        } else {
            item.brightness = brightness;
        }
    });
    
    return this;
};

/**
 * Updates the PiGlow to reflect the states of the LEDs.
 */
LEDCollection.prototype.set = function() {
    JVSPiGlow.set(this);
};

/**
 * Creates a new `LEDEffect` object for all LEDs in the collection.
 * @param {Object} options The options to use for the effect.
 *   @param {Number} mode The effect mode (`JVSPiGlow.EFFECT_FADE` or `JVSPiGlow.EFFECT_PULSE`).
 *   @param {Number} targetBrightness The target brightness (between 0 and 255) that will be applied to all LEDs included in the effect.
 *   @param {Number} [duration] The fade duration. Required if the effect mode is `EFFECT_FADE`.
 *   @param {Number} [cycleDelay] The delay between each cycle. Required if the effect mode is `EFFECT_PULSE`.
 *   @param {Number} [cycleFadeDuration=0] The fade duration of each cycle, used when the effect mode is `EFFECT_PULSE`. 0 means no fade. Optional (0 by default).
 *   @param {Number} [repeatCount=0] The pulse count, used when the effect mode is `EFFECT_PULSE`. 0 means infinite. Optional (0 by default).
 */
LEDCollection.prototype.effect = function(options) {
    return JVSPiGlow.LEDEffect(this, options);
};

/**
 * Clones the `LEDCollection` object.
 * @returns {LEDCollection} The cloned `LEDCollection` object.
 */
LEDCollection.prototype.clone = function() {
    return JVSPiGlow.LEDCollection(this.items, this.defaultBrightness);
};

// Exports the `LEDCollection` object.
module.exports = function(jvsPiGlow) {
    JVSPiGlow = jvsPiGlow;
    
    return LEDCollection;
};
