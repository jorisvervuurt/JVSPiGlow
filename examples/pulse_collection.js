// Define dependencies.
var PiGlow = require('../index.js');

// Reset the PiGlow (turns all LEDs off).
PiGlow.reset();

// Pulse all LEDs with a target brightness of 10.
var pulseEffect = PiGlow.LEDCollection(PiGlow.ALL_LEDS).effect({
    mode: PiGlow.EFFECT_PULSE,
    targetBrightness: 10,
    cycleDelay: 500,
    cycleFadeDuration: 100, // Remove or set to 0 to disable the fade effect.
    repeatCount: 5 // Remove or set to 0 for infinite pulsing.
});

pulseEffect.on('finished', function() {
    // When the pulse effect finishes, kill the Python process used by JVSPiGlow and reset the PiGlow.
    PiGlow.kill(true);
});

// Start the pulse effect.
pulseEffect.start();
