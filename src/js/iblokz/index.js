"use strict";

var iblokz = {};

iblokz.resolve = function(namespace, node){

	node = node || window;
	
	if(typeof namespace === "string")
		namespace = namespace.split(".");


	if(typeof node[namespace[0]] !== "undefined"){
		node = node[namespace[0]];
		namespace.splice(0,1);
		return iblokz.resolve(namespace, node);
	}

	if(node === window)
		return false;

	return node;
	
}