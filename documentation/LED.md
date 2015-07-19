<a name="LED"></a>
## LED
**Kind**: global class  

* [LED](#LED)
  * [new LED(position, [brightness])](#new_LED_new)
  * [.setBrightness(brightness)](#LED+setBrightness) ⇒ <code>[LED](#LED)</code>
  * [.set()](#LED+set)
  * [.effect(options)](#LED+effect)
  * [.clone()](#LED+clone) ⇒ <code>[LED](#LED)</code>

<a name="new_LED_new"></a>
### new LED(position, [brightness])
Creates a new `LED` object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| position | <code>Number</code> |  | The position of the LED (between 1 and 18). |
| [brightness] | <code>Number</code> | <code>0</code> | The brightness of the LED (between 0 and 255). Optional (0 by default). |

<a name="LED+setBrightness"></a>
### led.setBrightness(brightness) ⇒ <code>[LED](#LED)</code>
Sets the brightness of the LED.

**Kind**: instance method of <code>[LED](#LED)</code>  
**Returns**: <code>[LED](#LED)</code> - The updated `LED` object.  

| Param | Type | Description |
| --- | --- | --- |
| brightness | <code>Number</code> | The brightness of the LED (between 0 and 255). |

<a name="LED+set"></a>
### led.set()
Updates the PiGlow to reflect the state of the LED.

**Kind**: instance method of <code>[LED](#LED)</code>  
<a name="LED+effect"></a>
### led.effect(options)
Creates a new `LEDEffect` object for the LED.

**Kind**: instance method of <code>[LED](#LED)</code>  

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

<a name="LED+clone"></a>
### led.clone() ⇒ <code>[LED](#LED)</code>
Clones the `LED` object.

**Kind**: instance method of <code>[LED](#LED)</code>  
**Returns**: <code>[LED](#LED)</code> - The cloned `LED` object.