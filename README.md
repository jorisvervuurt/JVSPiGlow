# JVSPiGlow
> A lightweight but powerful module, that allows you to easily control a [PiGlow](http://shop.pimoroni.com/products/piglow) from [Node.js](https://nodejs.org)

## Features
JVSPiGlow allows you to control a PiGlow in multiple ways:

* Set the brightness of all LEDs
* Set the brightness of all LEDs that have a specific color (the PiGlow has six differently colored LED 'rings')
* Set the brightness of all LEDs within a specific arm (the PiGlow has three LED 'arms')
* Set the brightness of a specific LED
* Set the brightness of a specific collection of LEDs

JVSPiglow also includes two easy-to-use effects:
    
* Fade a specific LED or a collection of LEDs to a specific brightness
* Pulse a specific LED or a collection of LEDs

## Hardware requirements

* [Raspberry Pi](https://www.raspberrypi.org/help/what-is-a-raspberry-pi/) (tested on a Pi 2 Model B only, but should work on all previous models)
* [Pimoroni PiGlow](http://shop.pimoroni.com/products/piglow)

## Installation
Note: these installation instructions assume that your Raspberry Pi is running an installation of [Raspbian](https://www.raspberrypi.org/downloads/), with both [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed. Additionally, JVSPiGlow requires Python 2.x, which should come pre-installed with Raspbian.

### Preparing for the installation
First of all, make sure that the Raspberry Pi is up-to-date:
    
    sudo apt-get update && sudo apt-get upgrade

Next, install the SMBus module for Python, as it's required for JVSPiGlow to work:
    
    sudo apt-get install python-smbus
    
Finally, you'll need to enable the I2C interface:

1. Open the modules configuration file:

        sudo nano /etc/modules

2. Add the following line at the end of the file (if it's not already there):

        i2c-dev

3. Save the file by pressing `Ctrl + X`, followed by `Y` and `Enter`.

4. Open the Raspberry Pi Configuration Tool:

        sudo raspi-config

5. Select `Advanced Options` and choose `I2C`. Enable both the I2C interface and kernel module when prompted.


6. Reboot the Raspberry Pi.

### Installing JVSPiGlow
1. Use `cd` to navigate to the Node.js project directory.

2. Install JVSPiGlow using npm:

        npm install jvspiglow --save

## Usage
JVSPiGlow consists of four separate components:

* `JVSPiGlow` - the main object that is exported when the module is loaded using `require()`
* `JVSPiGlow.LED` - an object that represents a specific LED
* `JVSPiGlow.LEDCollection` - an object that represents a collection of LEDs
* `JVSPiGlow.LEDEffect` - an object that represents an effect that can be applied to a specific LED or a collection of LEDs

Documentation for each of the above mentioned components can be found [here](https://github.com/jorisvervuurt/JVSPiGlow/tree/master/documentation).

Code examples that show how to use JVSPiGlow can be found [here](https://github.com/jorisvervuurt/JVSPiGlow/tree/master/examples).

## License
The MIT License (MIT)

Copyright (c) 2015 Joris Vervuurt Software

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.