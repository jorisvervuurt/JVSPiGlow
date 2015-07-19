<a name="LEDCollection"></a>
## LEDCollection
**Kind**: global class  

* [LEDCollection](#LEDCollection)
  * [new LEDCollection([leds], [defaultBrightness])](#new_LEDCollection_new)
  * [.setBrightness(brightness, [ledPosition])](#LEDCollection+setBrightness) ⇒ <code>[LEDCollection](#LEDCollection)</code>
  * [.set()](#LEDCollection+set)
  * [.effect(options)](#LEDCollection+effect)
  * [.clone()](#LEDCollection+clone) ⇒ <code>[LEDCollection](#LEDCollection)</code>

<a name="new_LEDCollection_new"></a>
### new LEDCollection([leds], [defaultBrightness])
Creates a new `LEDCollection` object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [leds] | <code>Array</code> |  | An array that contains LED positions and/or `LED` objects and/or `LEDCollection` objects. Optional (you may add LED objects to the items array directly). |
| [defaultBrightness] | <code>Number</code> | <code>0</code> | The default brightness (between 0 and 255). Optional (0 by default). |

<a name="LEDCollection+setBrightness"></a>
### ledCollection.setBrightness(brightness, [ledPosition]) ⇒ <code>[LEDCollection](#LEDCollection)</code>
Sets the brightness of all LEDs in the collection or sets the brightness of a specific LED.

**Kind**: instance method of <code>[LEDCollection](#LEDCollection)</code>  
**Returns**: <code>[LEDCollection](#LEDCollection)</code> - The updated `LEDCollection` object.  

| Param | Type | Description |
| --- | --- | --- |
| brightness | <code>Number</code> | The brightness of the LED/LEDs (between 0 and 255). |
| [ledPosition] | <code>Number</code> | The position of a specific led (between 1 and 18). Optional (omitting results in the brightness being set for all LEDs). |

<a name="LEDCollection+set"></a>
### ledCollection.set()
Updates the PiGlow to reflect the states of the LEDs.

**Kind**: instance method of <code>[LEDCollection](#LEDCollection)</code>  
<a name="LEDCollection+effect"></a>
### ledCollection.effect(options)
Creates a new `LEDEffect` object for all LEDs in the collection.

**Kind**: instance method of <code>[LEDCollection](#LEDCollection)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The options to use for the effect. |

 `options` is a simple `Object`, used to configure the effect:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | <code>Number</code> |  | The effect mode (`JVSPiGlow.EFFECT_FADE` or `JVSPiGlow.EFFECT_PULSE`). |
| targetBrightness | <code>Number</code> |  | The target brightness (between 0 and 255) that will be applied to all LEDs included in the effect. |
| [duration] | <code>Number</code> |  | The fade duration. Required if the effect mode is `EFFECT_FADE`. |
| [cycleDelay] | <code>Number</code> |  | The delay between each cycle. Required if the effect mode is `EFFECT_PULSE`. |
| [cycleFadeDuration] | <code>Number</code> | <code>0</code> | The fade duration of each cycle, used when the effect mode is `EFFECT_PULSE`. 0 means no fade. Optional (0 by default). |
| [repeatCount] | <code>Number</code> | <code>0</code> | The pulse count, used when the effect mode is `EFFECT_PULSE`. 0 means infinite. Optional (0 by default). |

<a name="LEDCollection+clone"></a>
### ledCollection.clone() ⇒ <code>[LEDCollection](#LEDCollection)</code>
Clones the `LEDCollection` object.

**Kind**: instance method of <code>[LEDCollection](#LEDCollection)</code>  
**Returns**: <code>[LEDCollection](#LEDCollection)</code> - The cloned `LEDCollection` object.