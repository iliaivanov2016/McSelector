McSelector
================================================================================

A lightweight jQuery plugin provides highly customized drop down selector with
optional autocomplete function (filter on type). Support images, multi-select,
custom values, check marks for selected items, multiple columns, rows / number limit.

The plugin can be attached to any Select or Input (text or hidden types) DOM
objects.


Release Version (minified for production):

<link href="dist/css/mc-selector-<THEME>.min.css" type="text/css"/>
<script src="dist/js/mc-selector.min.js" type="text/javascript"></script>

Source Code Version:

<link href="src/css/mc-selector-<THEME>.css" type="text/css"/>
<script src="src/js/mc-selector.js" type="text/javascript"></script>

Themes: dark, light, green, blue, orange.

Example #1 (Basic use - based on existing SELECT):
<select data-attach="mc-selector">
<option value="EN" selected="selected">English</option>
<option value="DE">German</option>
<option value="FR">French</option>
<option value="RU">Russian</option>
</select>


Example #2 (Basic use html with javascript options passed through data-attach-options attribute):
<select data-attach="mc-selector" data-attach-options='{selection:"EN",data:[{label:"English",value:"EN"},{label:"German",value:"DE"},{label:"French",value:"FR"},{label:"Russian",value:"RU"}]}'>
</select>

Example #3 (Attach to existing object using Javascript)
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


Versions
================================================================================================================================================
v.1.00 - 17 January 2018


All upgrades are free lifetime, even for commercial full version.
Support and documentation is on official web site:

https://modcoding.com

(c) Modular Coding Inc., 2018.