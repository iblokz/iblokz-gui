"use strict";

if(typeof iblokz === "undefined"){ iblokz = {}; }
if(typeof iblokz.core === "undefined"){ iblokz.core = {}; }

iblokz.core.Store = function(){
	this._data = {}
	this._subscriptions = [];
}

iblokz.core.Store.update = function(message){
	this._data = message.data;

	this.update();
}

iblokz.core.Store.prototype.subscribe = function(subscription){
	this._subscriptions.push(subscription);
}

iblokz.core.Store.prototype.notify = function(){
	this._subscriptions.forEach(function(subscription){
		subscription(this._data);
	});
}