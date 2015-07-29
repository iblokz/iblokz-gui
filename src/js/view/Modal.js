	
	

	iblokz.initProc.push(function(){
		if(!iblokz.view)
			iblokz.view = {};
		
		iblokz.view.Modal = new JS.Class(iblokz.dom.Bean,{
			_link : 'widget.TabPanel',
			_tag : '<div></div>',
			_cls : {
				'obj' : '',
				'overlay' : 'modal-overlay',
				'dialog' : '',
			},
			_overlay : {},
			_dialog : {},
			initialize : function(prefs,container)
			{
				this.callSuper(prefs,container);
			},
			construct : function()
			{
				this._obj.html('');
				
				this._overlay = $("<div></div>");
				this._overlay.addClass(this._cls.overlay);
				
				this._overlay.appendTo(this._obj);
				
				
				
			},
			show: function() 
			{
				this.callSuper();
			},
			hide: function() 
			{
				this.callSuper();
			}
		});
		
		iblokz.classLinks['view.Modal'] = iblokz.view.Modal;
	});