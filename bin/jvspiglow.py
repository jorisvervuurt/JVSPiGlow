#
#  jvspiglow.py
#  JVSPiGlow
#
#  Created by Joris Vervuurt on 18-07-15.
#  Copyright (c) 2015 Joris Vervuurt Software. All rights reserved.
#

#  The MIT License (MIT)
#
#  Copyright (c) 2015 Joris Vervuurt Software
#
#  Permission is hereby granted, free of charge, to any person obtaining a copy
#  of this software and associated documentation files (the "Software"), to deal
#  in the Software without restriction, including without limitation the rights
#  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#  copies of the Software, and to permit persons to whom the Software is
#  furnished to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in all
#  copies or substantial portions of the Software.
#
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#  SOFTWARE.

import RPi.GPIO as GPIO
from smbus import SMBus

class PiGlow:
    SN3218_I2C_ADDR = 0x54
    SN3218_ENABLE_OUTPUT_CMD = 0x00
    SN3218_ENABLE_LEDS_CMD = 0x13
    SN3218_SET_PWM_VALUES_CMD = 0x01
    SN3218_UPDATE_REGISTER_CMD = 0x16
    
    LEDS = [0x07, 0x08, 0x09, 0x06, 0x05, 0x0A, 0x12, 0x11, 0x10,
        0x0E, 0x0C, 0x0B, 0x01, 0x02, 0x03, 0x04, 0x0F, 0x0D]
    
    def __init__(self):
        
        if GPIO.RPI_REVISION == 1:
            i2c_bus = 0
        elif GPIO.RPI_REVISION == 2 or GPIO.RPI_REVISION == 3:
            i2c_bus = 1
        else:
            print 'Failed to initialize I2C bus.'
            raise SystemExit

        self.bus = SMBus(i2c_bus)
        self.bus.write_byte_data(self.SN3218_I2C_ADDR, self.SN3218_ENABLE_OUTPUT_CMD, 0x01)
        self.bus.write_i2c_block_data(self.SN3218_I2C_ADDR, self.SN3218_ENABLE_LEDS_CMD, [0xFF, 0xFF, 0xFF])

    def reset(self):
        self.bus.write_i2c_block_data(
           self.SN3218_I2C_ADDR, self.SN3218_SET_PWM_VALUES_CMD, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        self.update_register()

    def set_led(self, led, brightness):
        self.bus.write_byte_data(self.SN3218_I2C_ADDR, self.LEDS[led - 1], brightness)

    def update_register(self):
	    self.bus.write_byte_data(self.SN3218_I2C_ADDR, self.SN3218_UPDATE_REGISTER_CMD, 0xFF)

import json

piGlow = PiGlow()

while True:
    data = json.loads(raw_input())
    command = data['command']
    
    if command == 'reset':
        piGlow.reset()
    elif command == 'set_led':
        led = data['led']
        piGlow.set_led(led['position'], led['brightness'])
        
        piGlow.update_register()
    elif command == 'set_leds':
        for led in data['leds']:
            piGlow.set_led(led['position'], led['brightness'])
        
        piGlow.update_register()
