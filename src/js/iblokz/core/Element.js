"use strict";

if(typeof iblokz === "undefined"){ var iblokz = {}; }
if(typeof iblokz.core === "undefined"){ iblokz.core = {}; }

iblokz.core.Element = function(selector, container, prefs){	
	this._obj = $(selector || "<div></div>");
	this._container = $(container || "body");
	this._prefs = prefs || {};
	this._state = {};
	this._children = [];

	function updateState(state){
		this._state = state;
		this.refresh();
	}
	
	if(typeof this._prefs.children != "undefined") {
		var element = this;
		this._prefs.children,forEach(function(childPrefs){
			var childClass = iblokz.resolve(childPrefs.namespace)
			if(childClass) {
				var child = new childClass(childPrefs.selector, element._obj, childPrefs);
				element._children.push(child);
			}
		})
	}

	if(typeof this._prefs.store != "undefined"){
		var store = iblokz.resolve(this._prefs.store);
		store.subscribe(updateState);
	}
}

iblokz.core.Element.prototype.refresh = function(){
	if(!$.contains(this._container[0],this._obj[0])){
		this._obj.appendTo(this._container);
	}

	this._children.forEach(function(child){
		child.refresh();
	})
}