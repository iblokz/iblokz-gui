"use strict";

if(typeof iblokz === "undefined"){ iblokz = {}; }
if(typeof iblokz.core === "undefined"){ iblokz.core = {}; }

iblokz.core.ElementFactory = function(path, selector, container, prefs){

	function resolvePath(pathTree, pathNodes){
		var elementClass = pathTree;
		
		if(typeof pathTree[pathNodes[0]] !== "undefined"){
			elementClass = pathTree[pathNodes[0]];
			pathNodes.splice(0,1);
			return resolvePath(elementClass,pathNodes);
		}

		return elementClass;
	}

	var elementClass = resolvePath(window, path.split("."));

	var element = new elementClass(selector, container, prefs);

	return element;

}