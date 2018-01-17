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
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>

Release Version (minified for production):

<link href="dist/css/mc-selector-<THEME>.min.css" type="text/css"/>
<script src="dist/js/mc-selector.min.js" type="text/javascript"></script>

Source Code Version:

<link href="src/css/mc-selector-<THEME>.css" type="text/css"/>
<script src="src/js/mc-selector.js" type="text/javascript"></script>

Themes: dark, light, green, blue, orange.

Examples
================================================================================


Example #1 (Basic use - based on existing SELECT):
<code>
    <select data-attach="mc-selector">
    <option value="EN" selected="selected">English</option>
    <option value="DE">German</option>
    <option value="FR">French</option>
    <option value="RU">Russian</option>
    </select>
</code>


Example #2 (Basic use html with javascript options passed through data-attach-options attribute):
<code>
  <select data-attach="mc-selector" data-attach-options='{selection:"EN",data:[{label:"English",value:"EN"},{label:"German",value:"DE"},{label:"French",value:"FR"},{label:"Russian",value:"RU"}]}'>
  </select>
</code>

Example #3 (Attach to existing object using Javascript)
<code>
  <select class="language"></select>
  <!-- .... ->
  <script type="text/javascript">
    jQuery(document).ready(function(){
      jQuery("select.language").McSelector({
        selection:"EN",
        data: [{label:"English",value:"EN"},{label:"German",value:"DE"},{label:"French",value:"FR"},{label:"Russian",value:"RU"}]
      });
    });
  </script>
</code>


Versions
================================================================================

v.1.00 - 17 January 2018

This version is for <b>Personal Use Only</b>! 
See PersonalLicense.htm for details.

You can order commercial version here:
https://modcoding.com

(c) Modular Coding Inc., 2018.