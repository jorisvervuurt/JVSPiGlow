<a name="JVSPiGlow"></a>
## JVSPiGlow
**Kind**: global class  

* [JVSPiGlow](#JVSPiGlow)
  * [new JVSPiGlow()](#new_JVSPiGlow_new)
  * [.set([ledOrLedCollection])](#JVSPiGlow+set)
  * [.reset([callback])](#JVSPiGlow+reset)
  * [.kill([performReset], [callback])](#JVSPiGlow+kill)

<a name="new_JVSPiGlow_new"></a>
### new JVSPiGlow()
Creates a new `JVSPiGlow` object.

<a name="JVSPiGlow+set"></a>
### jvsPiGlow.set([ledOrLedCollection])
Updates the PiGlow.

**Kind**: instance method of <code>[JVSPiGlow](#JVSPiGlow)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [ledOrLedCollection] | <code>LED</code> &#124; <code>LEDCollection</code> | The `LED` or `LEDCollection` to include in the update. Optional (omitting results in a reset). |

<a name="JVSPiGlow+reset"></a>
### jvsPiGlow.reset([callback])
Resets the PiGlow (turns all LEDs off).

**Kind**: instance method of <code>[JVSPiGlow](#JVSPiGlow)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | A function to call when the PiGlow has been reset. Optional. |

<a name="JVSPiGlow+kill"></a>
### jvsPiGlow.kill([performReset], [callback])
Kills the Python process used by JVSPiGlow.

**Kind**: instance method of <code>[JVSPiGlow](#JVSPiGlow)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [performReset] | <code>Boolean</code> | <code>false</code> | A flag that indicates whether a reset should be performed prior to killing the Python process. Optional (no reset is performed by default). |
| [callback] | <code>function</code> |  | A function to call when the Python process has been killed. Optional. |