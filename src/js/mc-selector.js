/*
Javascript Standard: ECMAScript 3
IE 9.0+, Firefox 1.5+

started 17.01.2018

4 hours
 */
var McSelectorDebug = 1;
var McBasePath = "";

String.prototype.htmlEntities = function() {
	return String(this).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/,/g, '&#44');
}

function mc_selector_create(source, params){
	var $ = jQuery;
	if (McSelectorDebug) console.log(">mc_selector_create",source,params);
	if (typeof params !== "object") params = {};
	if (!params.hasOwnProperty("data")) {
		params["data"] = []; // {icon, label, value, selected, disabled}
console.log("no own data tag = " + $(source).prop("tagName"));
		if ($(source).prop("tagName") === "SELECT") {
			$(source).find("option").each(function(){
console.log($(this).html());
				params["data"].push({
					"icon": null,
					"label": "" + $(this).html(),
					"value": "" + $(this).attr("value"),
					"selected": !!($(this).is(":selected") && (!$(this).is(":disabled"))),
					"disabled": !!($(this).is(":disabled"))
				});
			});
		}
	}
	if (!params.hasOwnProperty("expandIcon"))
		params["expandIcon"] = McBasePath+"css/icons/down.png";
console.log("Final params",params);
	// McSelector class
	var McSelector = {
		"params": 	params,
		"source": 	source,
		"select": 	null, // button element created instead of select/input
		"dropdown":	null, // div element with absolute position below select element
		"list":			null, // ul element inside dropdown div
		"items":		[],   // li elements inside list
		// code
		"init": 		function(){
			var value = "", values = [];
			var w=0,h=0,min=0,css=null,d=0;
			var mc_selector = this;

			this.params["data"].forEach(function (item){
				if (item.selected && (!item.disabled)) {
					var label = "" + item.label;
					values.push(label.htmlEntities());
				}
			});
			if (values.count > 1)
				value = values.join(", ");
			else
			if (values.count < 1)
				value = (this.params.data.length > 0)? ("" + this.params.data[0].label).htmlEntities() : "";
			else
				value = values[0];
console.log(values); console.log("value = "+value);
			// create select element
			w = $(this.source).width();
			if (isNaN(w) || (w < 16))
				w = 16;
			h = $(this.source).height();
			if (isNaN(h) || (h < 16))
				h = 16;
			d = Math.min(w,h) % 8;
			min = Math.min(w,h) - d ;
			this.select = $("<div/>").addClass("mc-selector-select").css({
				width: 		w+"px",
				height:		h+"px"
			});
			css = {
							width: 			min+"px",
							height: 		min+"px"
			};
console.log("w = "+w+" h = "+h+" d = "+d+" min = "+min,css);
			// create text for select element
			var select_span = $("<span/>").html(value);
			$(this.select).append(select_span);
			// create down icon for select element
			var select_img = $("<img src=''>").attr({
				"src": params["expandIcon"],
				"alt": "v"
			}).css(css);
			$(this.select).append(select_img);
			$(select_img).on("click", function(){
				$(mc_selector.dropdown).fadeIn(100);
			});
			$(this.source).hide().after(this.select);
			// create dropdown
			this.dropdown = $("<div/>").addClass("mc-selector-dropdown").css({
				left:			$(mc_selector.source).offset().left+w,
				top:			$(mc_selector.source).offset().top + Math.round(h/2),
				width:		Math.round(w  * 1.4) +"px"
			}).hide();
			$(this.select).after(this.dropdown);
			// create list
			this.list = $("<ul/>").addClass("mc-selector-list");
			$(this.dropdown).append(this.list);
			// create items
			this.params.data.forEach(function (item, index){
				var li = $("<li/>");
				var label = ("" + item.label).htmlEntities();
console.log(label);
				$(li).html( label );
				$(li).prop("data-index",index);

				$(li).prop("selected", item.selected); // TODO: add checkmark!!!
				if (item.selected) {
					$(li).css({"font-weight": "bold"});
				}

				$(li).prop("disabled", item.disabled);
				mc_selector.items.push(li);
				$(mc_selector.list).append(li);
			});
			$(this.dropdown).append(this.list);
			$(this.dropdown).on("mouseleave", function(){
			  setTimeout( function() {
					$(mc_selector.dropdown).fadeOut(100);
				}, 200);
			});
		} // init
	}; // McSelector class

	McSelector.init();
	source["McSelector"] = McSelector;
	return source;
}

(function( $ ) {

	$.fn.McSelector = function( params ) {

		return mc_selector_create(this, params);

	};

}( jQuery ));

// applies McSelector on all select & input elements with data-attach atttribute set to "mc-selector"
jQuery(document).ready(function(){
	jQuery("script").each(function(){
		var s = ("" + $(this).prop("src"));
		var idx = s.indexOf("mc-selector.");
		if (idx >= 0) {
			McBasePath = s.substr(0,idx).replace("/js","");
			console.log(McBasePath);
		}
	});
	jQuery("select, input[type='text'], input[type='hidden']").each(function(){
    if (jQuery(this).attr("data-attach") === "mc-selector") {
      var opt = jQuery(this).attr("data-options");
      if (!opt)
        opt = {};
//if (McSelectorDebug) console.log(opt);
      jQuery(this).McSelector(opt);
		}
  });
});
