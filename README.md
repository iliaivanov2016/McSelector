McSelector 
================================================================================

A lightweight jQuery plugin provides highly customized drop down selector with
optional autocomplete function (filter on type). Support images, multi-select,
custom values, check marks for selected items, multiple columns, rows / number limit.

The plugin can be attached to any Select or Input (text or hidden types) DOM
objects.

Include
================================================================================

jQuery (if already included - ignore)
<br/>
<code>
&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
</code>

Release Version (minified for production):
<br/>
<code>
&lt;link rel=&quot;stylesheet&quot; href=&quot;dist/css/mc-selector-&lt;THEME&gt;.min.css&quot; /&gt;
<br/>
&lt;script src=&quot;dist/js/mc-selector.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
</code>

Source Code Version:
<br/>
<code>
&lt;link rel=&quot;stylesheet&quot; href=&quot;src/css/mc-selector-&lt;THEME&gt;.css&quot; /&gt;
<br/>
&lt;script src=&quot;src/js/mc-selector.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
</code>

Themes: dark, light, green, blue, orange.

Examples
================================================================================


Example #1 (Basic use - based on existing SELECT):
<br/>
<code>
    &lt;select data-attach=&quot;mc-selector&quot;&gt;
<br/>    
    &lt;option value=&quot;EN&quot; selected=&quot;selected&quot;&gt;English&lt;/option&gt;
<br/>    
    &lt;option value=&quot;DE&quot;&gt;German&lt;/option&gt;
<br/>    
    &lt;option value=&quot;FR&quot;&gt;French&lt;/option&gt;
<br/>    
    &lt;option value=&quot;RU&quot;&gt;Russian&lt;/option&gt;
<br/>
    &lt;/select&gt;
</code>


Example #2 (Basic use html with javascript options passed through data-attach-options attribute):

<br/><code>
  &lt;select data-attach=&quot;mc-selector&quot; data-attach-options='{selection:&quot;EN&quot;,data:[{label:&quot;English&quot;,value:&quot;EN&quot;},{label:&quot;German&quot;,value:&quot;DE&quot;},{label:&quot;French&quot;,value:&quot;FR&quot;},{label:&quot;Russian&quot;,value:&quot;RU&quot;}]}'&gt;
<br/>  
  &lt;/select&gt;
</code>  


Example #3 (Attach to existing object using Javascript)
<br/>
<code>
  &lt;select class=&quot;language&quot;&gt;&lt;/select&gt;
<br/>  
  &lt;!-- .... -&gt;
<br/>  
  &lt;script type=&quot;text/javascript&quot;&gt;
<br/>  
    jQuery(document).ready(function(){
<br/>    
      jQuery(&quot;select.language&quot;).McSelector({
<br/>      
        selection:&quot;EN&quot;,
<br/>        
        data: [{label:&quot;English&quot;,value:&quot;EN&quot;},{label:&quot;German&quot;,value:&quot;DE&quot;},{label:&quot;French&quot;,value:&quot;FR&quot;},{label:&quot;Russian&quot;,value:&quot;RU&quot;}]
<br/>        
      });
<br/>      
    });
<br/>    
  &lt;/script&gt;
</code>

================================================================================
Documentation
jQuery.fn.McSelector:

Functions
<br/>
<b>function</b> <b>init</b>( <b>params</b> );
<br/>
<b>params</b> object properties:
<br/><br/>

<b>multiple</b>: <b>true</b> || <b>false</b>
Allows multiple selection if set to <b>true</b>.
<br/> 
Default <b>false</b>.

<b>disableAutoSelectFirstElement</b>: <b>true</b> || <b>false</b>
Disables automatic selection of first element if nothing selected. 
Default: <b>false</b>.

data: Array of item objects
<code>
<br/>
[
<br/>
{"label":"<some label>", "value": "<some value>", selected: false, disabled: false, icon: ""},
<br/>
{"label":"<some label>", "value": "<some value>", selected: false, disabled: false, icon: ""},
<br/>
...
<br/>
{"label":"<some label>", "value": "<some value>", selected: false, disabled: false, icon: ""}
<br/>
]
<br/>
</code>

<b>expandIcon</b>: String path to dropdown icon file
Specifies custom icon to be displayed after current value to show dropdown.
Default: path to current theme "down.png"

<b>change</b>
<br/>
<code>
<b>change</b>: <b>function</b>(<b>labels</b>, <b>values</b>, <b>indexes</b>){
<br/>
// ... Your code
}
</code>

Specifies event handler when selection changes.
Passes Arrays of labels, values and indexes (0-based index in parent dropdown) of all selected elements. 
Triggered on first initialization of the McSelector when params loaded.
<br/>
<b>Default</b>: <b>null</b>;


<b>selectedClass</b>
CSS ClassName that will be applied to selected items of dropdown list using jQuery.addClass() function.


Versions
================================================================================

v.1.00 - 17 January 2018

This version is for &lt;b&gt;Personal Use Only&lt;/b&gt;! 
See PersonalLicense.htm for details.

You can order commercial version here:
https://modcoding.com

(c) Modular Coding Inc., 2018.