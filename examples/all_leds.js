// Define dependencies.
var PiGlow = require('../index.js');

// Reset the PiGlow (turns all LEDs off).
PiGlow.reset();

// Set the brightness of all LEDs to the maximum value.
PiGlow.LEDCollection(PiGlow.ALL_LEDS, 255).set();

// After 5 seconds, kill the Python process used by JVSPiGlow and reset the PiGlow.
setTimeout(function() {
    PiGlow.kill(true);
}, 5 * 1000);
