	
	iblokz.initProc.push(function(){
		iblokz.dom.Bean = new JS.Class({
			_link : 'dom.Bean',
			_tag : '<div></div>',
			_prefs : {},
			_id : '',
			_obj : {},
			_content : null,	
			_html : '',
			_children : [],
			initialize: function(prefs, container) {
				
				if(container){
					this._container = container;
				} else {
					this._container = $("body");
				}

				if(prefs){
					this._prefs = prefs;
				} else {
					this._prefs = {};
				}
				
				if(prefs.tag){
					this._tag = prefs.tag;
				}
				
				if(prefs.id){
					iblokz.pointers[prefs.id] = this;
					if($("#"+prefs.id)[0]){
						this._obj = $("#"+prefs.id);
						//this._html = $("#"+prefs.id).html();
						
					}
					this._id = prefs.id;
				}
				
				if(!this._obj[0])
					this._obj = $(this._tag);
				
				if(this._prefs.id){
					this._obj.attr("id",this._prefs.id);
				}
				if(this._prefs.cls){
					this._obj.addClass(this._prefs.cls);
				}
				
				this.construct();
					
			},
			construct : function(){
				
				if(this._content === null)
					this._content = this._obj;
				
				if(this._prefs.html){
					this._html = this._prefs.html;
				}
				this._children = [];
				if(this._prefs.items){
					var children = [];
					for(i in this._prefs.items){
						var item = new iblokz.classLinks[this._prefs.items[i].link](this._prefs.items[i],this._content);
						children.push(item);
					}
					this._children = children;
				}
				if(this._html != ''){
					this._content.html(this._html);
				}
				
			},
			redraw : function(){ 
				this._obj.html(''); 
				this.construct(); 
				this.show();
			},
			setContainer : function(container){
				if(container){
					this._container = container;
				}
			},
			setHTML : function(html) {
				this._html = html;
			},
			addChild : function(child) {
				child.setContainer(this._content);				
				this._children.push(child);
			},
			show: function() {
				if($.contains(this._container[0],this._obj[0]))
					this._obj.hide().show();
				else
					this._obj.hide().appendTo(this._container).show();
				
				for(i in this._children){
					this._children[i].show();
				}
				
				return true;
			},
			hide: function() {
				for(i in this._children){
					this._children[i].hide();
				}
				this._obj.hide();
			},
			destroy: function(){
				for(i in this._children){
					this._children[i].destroy();
				}
				
			}
		});
		iblokz.dom.Form = new JS.Class(iblokz.dom.Bean,{
			_link : 'dom.Form',
			_tag : '<form></form>',
		});
		iblokz.dom.Input = new JS.Class(iblokz.dom.Bean,{
			_link : 'dom.Input',
			_tag : '<input />',
		});
		iblokz.dom.Table = new JS.Class(iblokz.dom.Bean,{
			_link : 'dom.Table',
			_tag : '<table></table>',
		});
		iblokz.dom.Tr = new JS.Class(iblokz.dom.Bean,{
			_link : 'dom.Tr',
			_tag : '<tr></tr>',
		});
		iblokz.dom.Td = new JS.Class(iblokz.dom.Bean,{
			_link : 'dom.Td',
			_tag : '<td></td>',
		});

		iblokz.classLinks['dom.Bean'] = iblokz.dom.Bean;
		iblokz.classLinks['dom.Form'] = iblokz.dom.Form;
		iblokz.classLinks['dom.Input'] = iblokz.dom.Input;
		iblokz.classLinks['dom.Table'] = iblokz.dom.Table;
		iblokz.classLinks['dom.Tr'] = iblokz.dom.Tr;
		iblokz.classLinks['dom.Td'] = iblokz.dom.Td;
				
	});
