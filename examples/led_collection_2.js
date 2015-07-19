// Define dependencies.
var PiGlow = require('../index.js');

// Reset the PiGlow (turns all LEDs off).
PiGlow.reset();

// Set the brightness of a specific collection of LEDs.
PiGlow.LEDCollection([
    [PiGlow.WHITE_LEDS, PiGlow.ORANGE_LEDS], // All white and orange LEDs (will use the default brightness of the collection (1 in this case)).
    PiGlow.LEDCollection([ // A collection of red LEDs.
        PiGlow.LED(1, 25), // First red LED with a brightness of 25.
        PiGlow.LED(7, 5), // Second red LED with a brightness of 5.
        PiGlow.LED(13, 1), // Third red LED with a brightness of 1.
    ]),
    [3, 9], // Two yellow LEDs (will use the default brightness of the collection (1 in this case)).
    PiGlow.LED(4, 25), // A single green LED with a brightness of 25.
    5 // A single blue LED (will uses the default brightness of the collection (1 in this case)).
], 1).set();

// After 5 seconds, kill the Python process used by JVSPiGlow and reset the PiGlow.
setTimeout(function() {
    PiGlow.kill(true);
}, 5 * 1000);
