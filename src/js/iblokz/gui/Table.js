
if(typeof iblokz === "undefined"){ iblokz = {}; }
if(typeof iblokz.dom === "undefined"){ iblokz.dom = {}; }

iblokz.dom.Table = function(selector, container, prefs){
	iblokz.core.Element.call(this, selector, container, prefs);
}

iblokz.dom.Table.prototype = Object.create( iblokz.core.Element );
iblokz.dom.Table.prototype.constructor = iblokz.dom.Table;

