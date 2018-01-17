/*
started 17.01.2018

1 hour
 */
var McSelectorDebug = 1;
var McSelectorLastId = 0;

(function( $ ) {

	$.fn.McSelector = function( params ) {

if (McSelectorDebug)		console.log(">McSelector",params);
		var $ = jQuery;
		this["McSelectorParams"] = params;
		var id = "mc-selector-"+(++McSelectorLastId);
		$(this).after('<span class="mc-selector-container" id="'+id+'">huy</span>');
		$("#"+id).width($(this).width());
/*
		$("#"+id).append('<div class="mc-selector-select"><input type="text" style="padding-right: 1em;"/></div>').width($(this).width());
		$("#"+id).append('<ul class="mc-selector-list mc-hidden"></ul>');
		if (typeof params === "object") {
			if (params.hasOwnProperty("data")) {
				for (var i = 0; i < params.data.length; i++) {
					var data = params.data[i];
					$("#"+id+" ul.mc-selector-list").append('<li></li>');
					if (data.hasOwnProperty("icon"))
						$("#"+id+" ul.mc-selector-list li").last().append('<img />').prop("src", data.icon).
						prop("alt",data.label || data.value);
					if (data.hasOwnProperty("label"))
						$("#"+id+" ul.mc-selector-list li").last().append('<span><span/>').html(data.label);
					if (data.hasOwnProperty("label"))
						$("#"+id+" ul.mc-selector-list li").last().prop("data-value",data.value);
				}
			}
		}
*/
		this.css({position:"aboslute", top: "-99999px", height: "1em", display: "none"});
if (McSelectorDebug) console.log("<McSelector");
		return this;

	};

}( jQuery ));

jQuery(document).ready(function($){
  $("select, input[type='text'], input[type='hidden']").each(function(){
    if ($(this).attr("data-attach").toString() === "mc-selector") {
      var opt = $(this).attr("data-options");
      if (!opt)
        opt = {};
if (McSelectorDebug) console.log(opt);
      $(this).McSelector(opt);
		}
  });
});