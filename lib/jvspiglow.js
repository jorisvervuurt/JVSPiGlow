//
//  jvspiglow.js
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
var LED = require("./led.js"),
    LEDCollection = require("./led_collection.js"),
    LEDEffect = require('./led_effect.js'),
    path = require('path'),
    spawn = require('child_process').spawn;

// Define variables.
var pythonProcess = null;

/**
 * Creates a new `JVSPiGlow` object.
 * @constructor
 */
function JVSPiGlow() {
    if (!(this instanceof JVSPiGlow)) {
        return new JVSPiGlow();
    }
    
    this.ALL_LEDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    
    this.LEDS_IN_FIRST_ARM = [1, 2, 3, 4, 5, 6];
    this.LEDS_IN_SECOND_ARM = [7, 8, 9, 10, 11, 12];
    this.LEDS_IN_THIRD_ARM = [13, 14, 15, 16, 17, 18];
    
    this.WHITE_LEDS = [6, 12, 18];
    this.BLUE_LEDS = [5, 11, 17];
    this.GREEN_LEDS = [4, 10, 16];
    this.YELLOW_LEDS = [3, 9, 15];
    this.ORANGE_LEDS = [2, 8, 14];
    this.RED_LEDS = [1, 7, 13];
    
    this.EFFECT_FADE = 0;
    this.EFFECT_PULSE = 1;
    
    this.currentlyRunningEffect = null;
    
    /**
     * Updates the PiGlow.
     * @param {LED|LEDCollection} [ledOrLedCollection] The `LED` or `LEDCollection` to include in the update. Optional (omitting results in a reset).
     */
    this.set = function(ledOrLedCollection) {
        var stdinObject = {};
        
        if (!ledOrLedCollection) {
            stdinObject.command = 'reset';
        } else if (ledOrLedCollection instanceof LED(this)) {
            stdinObject.command = 'set_led';
            stdinObject.led = ledOrLedCollection;
        } else if (ledOrLedCollection instanceof LEDCollection(this)) {
            stdinObject.command = 'set_leds';
            stdinObject.leds = ledOrLedCollection.items;
        } else {
            throw new Error('The specified LED or LEDCollection is invalid.');
        }
        
        if (!pythonProcess) {
            pythonProcess = spawn('python', [path.join(__dirname, '../bin/jvspiglow.py')]);
            pythonProcess.stdin.setEncoding('utf8');
        }
        
        pythonProcess.stdin.write(JSON.stringify(stdinObject) + '\n');
    };
    
    /**
     * Resets the PiGlow (turns all LEDs off).
     * @param {Function} [callback] A function to call when the PiGlow has been reset. Optional.
     */
    this.reset = function(callback) {
        if (this.currentlyRunningEffect) {
            var jvsPiGlow = this;
            
            this.currentlyRunningEffect.stop(function() {
                jvsPiGlow.set();
                
                if (callback) {
                    callback();
                }
            });
        } else {
            this.set();
                
            if (callback) {
                callback();
            }
        }
    };
    
    /**
     * Kills the Python process used by JVSPiGlow.
     * @param {Boolean} [performReset=false] A flag that indicates whether a reset should be performed prior to killing the Python process. Optional (no reset is performed by default).
     * @param {Function} [callback] A function to call when the Python process has been killed. Optional.
     */
    this.kill = function(performReset, callback) {
        if (this.currentlyRunningEffect) {
            var jvsPiGlow = this;
            
            this.currentlyRunningEffect.stop(function() {
                killPythonProcess(jvsPiGlow, performReset, callback);
            });
        } else {
            killPythonProcess(this, performReset, callback);
        }
    };
    
    this.LED = LED(this);
    this.LEDCollection = LEDCollection(this);
    this.LEDEffect = LEDEffect(this);
}

/**
 * Kills the Python process used by JVSPiGlow.
 * @private
 * @param {JVSPiGlow} jvsPiGlow The `JVSPiGlow` object that requested the kill.
 * @param {Boolean} [performReset=false] A flag that indicates whether a reset should be performed prior to killing the Python process. Optional (no reset is performed by default).
 * @param {Function} [callback] A function to call when the Python process has been killed. Optional.
 */
var killPythonProcess = function(jvsPiGlow, performReset, callback) {
    if (performReset) {
        jvsPiGlow.reset(function() {
            setTimeout(function() {
                if (pythonProcess) {
                    pythonProcess.kill();
                    pythonProcess = null;
                }
                
                if (callback) {
                    callback();
                }
            }, 1000);
        });
    } else {
        setTimeout(function() {
            if (pythonProcess) {
                pythonProcess.kill();
                pythonProcess = null;
            }
            
            if (callback) {
                callback();
            }
        }, 1000);
    }
};

// Exports the JVSPiGlow object.
module.exports = new JVSPiGlow();
