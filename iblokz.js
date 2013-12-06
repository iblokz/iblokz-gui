var iblokz = {
	classLinks : {},
	initProc : [],
	dom : {},
	widget : {},
	data : {},
	pointers : {},
	init : function(){
		for(i in this.initProc){
			this.initProc[i]();
		}
	}
};	
