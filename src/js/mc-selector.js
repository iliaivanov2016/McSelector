/*
Version: 0.0.1
Javascript Standard: ECMAScript 3
IE 9.0+, Firefox 1.5+

started 17.01.2018
updated 23.01.2018

7 hours

Done:
Example 1 works. Works like basic select element.
TODO:
Need add checkmarks, multiple selection and icons support.
 */
var McSelectorDebug = 1;
var McBasePath = "";
var McIsFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

String.prototype.htmlEntities = function() {
	return String(this).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;').replace(/,/g, '&#44');
}

function mc_selector_create(source, params){
	var $ = jQuery;
//if (McSelectorDebug && console) console.log($(source).offset());
	var offset = $(source).offset()
if (McSelectorDebug && console) console.log(">mc_selector_create",source,params);
	if (typeof params !== "object") params = {};
	if (!params.hasOwnProperty("data")) {
		params["data"] = []; // {icon, label, value, selected, disabled}
		if ($(source).prop("tagName") === "SELECT") {
			$(source).find("option").each(function(){
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
	if (params.hasOwnProperty("multiple"))
		params["multiple"] = !!(params["multiple"]);
	else
		params["multiple"] = false;
	if (!params.hasOwnProperty("disableAutoSelectFirstElement"))
		params["disableAutoSelectFirstElement"] = false;
if (McSelectorDebug && console) console.log("1. mc_selector_create - Final params",params);
	// McSelector class
	var McSelector = {
		"params": 	params,
		"source": 	source,
		"select": 	null, // button element created instead of select/input
		"dropdown":	null, // div element with absolute position below select element
		"list":			null, // ul element inside dropdown div
		"selectedItems": 	[],		// all selected items  (indexes in items, params.data)
		"values": 				[],   // all selected values
		"labels": 				[],   // all selected labels
		"value":					"",   // single value (for multiple - comma separated list of values)
		"label":					"",		// single label (for multiple - comma separated list of values)
		// code
		"updateValues": function (){
			var mc_selector = this;
			mc_selector.label = mc_selector.value = "";
if (McSelectorDebug && console) console.log(">updateValues: label="+mc_selector.label+" value = "+mc_selector.value,mc_selector.selectedItems,mc_selector.labels,mc_selector.values,mc_selector.params)
			if (mc_selector.selectedItems.length > 0) {
				if (mc_selector.params.multiple) {
					mc_selector.label = mc_selector.labels.join(", ");
					mc_selector.value = mc_selector.values.join(",");
				} else {
					mc_selector.label = mc_selector.labels[0];
					mc_selector.value = mc_selector.values[0];
				}
			}
if (McSelectorDebug && console) console.log("<updateValues: label="+mc_selector.label+" value = "+mc_selector.value,mc_selector.selectedItems,mc_selector.labels,mc_selector.values)
			// change text
			$(mc_selector.select).find("span").html(mc_selector.label);
			// set original element value
			$(mc_selector.source).val(mc_selector.value).trigger("change");
			// trigger change function
			if (mc_selector.params.hasOwnProperty("change") && (!mc_selector.params.change)){
				try{
					mc_selector.params.change(mc_selector.labels, mc_selector.values, mc_selector.selectedItems);
				}catch(e){}
			}
		},
		"getValue": function (){
			return this.value;
		},
		"getLabel": function (){
			return this.label;
		},
		"getValues": function (){
			return this.values;
		},
		// init
		"init": 		function(){
			var w=h=x=y=min=d=0,css=null;
			var mc_selector = this;
if (McSelectorDebug && console) console.log(">init",this.params);
			mc_selector.params["data"].forEach(function (item, index){
				if (item.selected && (!item.disabled)) {
					var label = ("" + item.label).htmlEntities();
					mc_selector.labels.push(label);
					mc_selector.values.push(item.value);
					mc_selector.selectedItems.push(index);
				}
			});
			// select first element by defailt
			if (!mc_selector.params.disableAutoSelectFirstElement) {
				if ((mc_selector.selectedItems.length <= 0) && (mc_selector.params["data"].length > 0)) {
					var item = mc_selector.params["data"][0];
					var label = ("" + item.label).htmlEntities();
					mc_selector.labels.push(label);
					mc_selector.values.push(item.value);
					mc_selector.selectedItems.push(index);
				}
			}
			mc_selector.updateValues();
if (McSelectorDebug && console) console.log("1.init values:",mc_selector.values,"value = "+mc_selector.value);
			// create select element
			w = $(source).outerWidth();
			if (isNaN(w) || (w < 16))
				w = 16;
			h = $(source).outerHeight();
			if (isNaN(h) || (h < 16))
				h = 16;
			d = Math.min(w,h) % 8;
			min = Math.min(w,h) - d ;
			var fs = $(source).css("font-size");
			this.select = $("<div/>").addClass("mc-selector-select").css({
				width: 				w+"px",
				"font-size":	parseInt(fs)+"px",
				height:				h+"px"
			});
			// image size
			var sw = w - 4 - 16;
if (McSelectorDebug && console) console.log("2.init sizes: w = "+w+" h = "+h+" d = "+d+" min = "+min+" span width = "+sw,"fs",fs);
			// create text for select element
			var select_span = $("<span/>").outerWidth(sw).html(mc_selector.label);
			// append text
			$(mc_selector.select).append(select_span);
			// create down icon for select element
			var select_img = $("<img src=''>").attr({
				"src": params["expandIcon"],
				"alt": "v"
			}).css({
				width: 			"16px",
				height: 		"16px"
			});
			// append down icon
			$(mc_selector.select).append(select_img);
			// bind open of dropdown
			$(mc_selector.select).on("click", function(evt){
				// show drop down
				evt.stopPropagation();
				evt.preventDefault();
				$(mc_selector.dropdown).fadeIn(100);
				setTimeout(function (){
					$(mc_selector.dropdown).addClass("mc-selector-dropdown-active")
				}, 200);
			});
			// hide source element and add select element after source
			$(source).hide().after(mc_selector.select);
			// create dropdown
			x = offset.left;
			// FirxeFox bug - need move left to 4px
			if (McIsFirefox) x -= 4;
			y = offset.top + h;
if (McSelectorDebug && console) console.log( "3.init - offset of source element: left = "+offset.left+" top = "+offset.top+" x = "+x+" y = "+y);
			mc_selector.dropdown = $("<div/>").addClass("mc-selector-dropdown").css({
				left:			x,
				top:			y,
				width:		w +"px"
			}).hide();
			$(mc_selector.select).after(this.dropdown);
			// create list
			mc_selector.list = $("<ul/>").addClass("mc-selector-list");
			$(mc_selector.dropdown).append(mc_selector.list);
			// create list items
			mc_selector.params.data.forEach(function (item, index){
				var li = $("<li/>");
				var label = ("" + item.label).htmlEntities();
				if (item.selected) {
					$(li).addClass("mc-selector-item-active");
				}
				$(li).html( label ).prop("data-index",index).prop("data-value",item.value).prop("selected", item.selected)
					.prop("disabled", item.disabled).on("click", function(evt){
					evt.stopPropagation();
					evt.preventDefault();
					// li clicked - change selected
					var selIndex = $(this).closest("li").prop("data-index");
if (McSelectorDebug && console) console.log("li selIndex = "+selIndex);
					var selItem = $(this).closest("li");
if (McSelectorDebug && console) console.log("li selIndex = "+selIndex,selItem);
					if ($(selItem).is(":disabled")) return;
					selItem.prop( "selected", !($(selItem).is(":selected")) ) ;
					if (!selItem.is(":selected")) {
if (McSelectorDebug && console) console.log("deselect selected item selIndex = " + selIndex+" indexOf = "+mc_selector.selectedItems.selIndexOf(selIndex));
						// deselected selItem
						if (mc_selector.selectedItems.selIndexOf(selIndex) >= 0) {
if (McSelectorDebug && console) console.log("DELETE FROM SELECTIONS index = "+selIndex);
							mc_selector.selectedItems.splice(selIndex, 1);
							mc_selector.values.splice(selIndex, 1);
							mc_selector.labels.splice(selIndex, 1);
						}
						$(selItem).removeClass("mc-selector-item-active");
					} else {
						// selected selItem
						if (!mc_selector.params.multiple && (mc_selector.selectedItems.length > 0)) {
							// unselect any prior selected item - "single" mode
							mc_selector.selectedItems.forEach(function (item1, index1){
								mc_selector.list.children("li").each(function(){
									$(this).prop("selected", false).removeClass("mc-selector-item-active");
								});
							});
							mc_selector.selectedItems = [];
							mc_selector.values = [];
							mc_selector.labels = [];
if (McSelectorDebug && console) console.log("DELETE OLD SINGLE SELECTION");
						}
						if (mc_selector.selectedItems.indexOf(selIndex) < 0) {
							mc_selector.selectedItems.push(selIndex);
							mc_selector.values.push($(selItem).prop("data-value"));
							mc_selector.labels.push($(selItem).html());
if (McSelectorDebug && console) console.log("ADD TO SELECTIONS index = "+selIndex);
						}
						$(selItem).addClass("mc-selector-item-active");
					}
					mc_selector.updateValues();
					if (!mc_selector.params.multiple && (mc_selector.selectedItems.length > 0)) {
						// close dropdown
						$(mc_selector.dropdown).removeClass("mc-selector-dropdown-active");
						setTimeout( function() {
							$(mc_selector.dropdown).fadeOut(100);
						}, 200);
					}
				});
				// add li item to list
				$(mc_selector.list).append(li);
			});
			// add list to dropdown
			$(mc_selector.dropdown).append(mc_selector.list);
			$(mc_selector.dropdown).on({
				mouseenter: function(evt) {
					$(evt.target).data('hovering', true);
				},
				mouseleave: function(evt) {
					$(evt.target).data('hovering', false);
				}
			}, "*");
		} // init
	}; // McSelector class

	McSelector.init();
	source["McSelector"] = McSelector;
	return source;
}

(function( $ ) {

	// McSelector function to apply McSelector to existing select/input elements
	$.fn.McSelector = function( params ) {

		return mc_selector_create(this, params);

	};
	// :hovering support
	$.expr[":"].hovering = function(elem) {
		return $(elem).data('hovering') ? true : false;
	};
	// close dropdowns for every click outside hovered drop down
	$(document).on("click", function(){
		$(".mc-selector-dropdown-active").each(function(){
			var curElement = this;
			if (!$(curElement).is(":hovering")) {
				$(curElement).removeClass("mc-selector-dropdown-active");
				// click outside hover - closing dropdown
				setTimeout( function() {
					$(curElement).fadeOut(100);
				}, 200);
			}
		});
	});

}( jQuery ));

// applies McSelector on all select & input elements with data-attach atttribute set to "mc-selector"
jQuery(document).ready(function(){
	jQuery("script").each(function(){
		var s = ("" + $(this).prop("src"));
		var idx = s.indexOf("mc-selector.");
		if (idx >= 0) {
			McBasePath = s.substr(0,idx).replace("/js","");
			if (McSelectorDebug && console) console.log(McBasePath);
		}
	});
	jQuery("select, input[type='text'], input[type='hidden']").each(function(){
    if (jQuery(this).attr("data-attach") === "mc-selector") {
      var opt = jQuery(this).attr("data-options");
      if (!opt)
        opt = {};
//if (McSelectorDebug) if (McSelectorDebug && console) console.log(opt);
			if (McSelectorDebug && console) console.log($(this).offset());
      jQuery(this).McSelector(opt);
    }
  });
});
