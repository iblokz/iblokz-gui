
	iblokz.initProc.push(function(){
		iblokz.widget.Toolbar = new JS.Class(iblokz.dom.Bean,{
			_link : 'widget.Toolbar',
			_tag : '<ul class="iblokz-toolbar"></ul>',
			_els : [],
			initialize : function(prefs,container){
				if(prefs['els']){
					this._els = prefs['els'];
				}
				this.callSuper(prefs,container);
			},
			addEl : function(prefs){
				this._els.push(prefs);
			},
			construct : function(){
				
				$(this._obj).html('');
				
				for(el in this._els){
					var elObj = $('<li></li>');
					if(this._els[el]['text']){
						elObj.html(this._els[el]['text']);
					}
					
					if(this._els[el]['cls']){
						elObj.addClass(this._els[el]['cls']);
					}
		
					if(this._els[el]['callback']){
						elObj.click(this._els[el]['callback']);
					}
		
					elObj.mousedown(function(){
						$(this).addClass('clicked');
					}).mouseup(function(){
						$(this).removeClass('clicked');
					}).mouseout(function(){
						$(this).removeClass('clicked');
					});
					
					elObj.appendTo(this._obj);
				}
			}
			
		});
		
		
		iblokz.classLinks['widget.Toolbar'] = iblokz.widget.Toolbar;
	});