<a name="LEDEffect"></a>
## LEDEffect
**Kind**: global class  

* [LEDEffect](#LEDEffect)
  * [new LEDEffect(ledOrLedCollection, options)](#new_LEDEffect_new)
  * [.start()](#LEDEffect+start)
  * [.stop([callback])](#LEDEffect+stop)

<a name="new_LEDEffect_new"></a>
### new LEDEffect(ledOrLedCollection, options)
Creates a new `LEDEffect` object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ledOrLedCollection | <code>LED</code> &#124; <code>LEDCollection</code> |  | The `LED` or `LEDCollection` to include in the effect. |
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

<a name="LEDEffect+start"></a>
### ledEffect.start()
Starts the effect.

**Kind**: instance method of <code>[LEDEffect](#LEDEffect)</code>  
<a name="LEDEffect+stop"></a>
### ledEffect.stop([callback])
Stops the effect.

**Kind**: instance method of <code>[LEDEffect](#LEDEffect)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | A function to call when the effect has stopped. Optional. |

### Events
<code>[LEDEffect](#LEDEffect)</code> is an `EventEmitter`. 

| Event | Description |
| --- | --- |
| started | Fired when an effect has been started. |
| stopped | Fired when an effect has been stopped. |
| finished | Fired when an effect has finished. |