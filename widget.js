
	iblokz.initProc.push(function(){
		iblokz.widget.tabpanel = new JS.Class(iblokz.dom.blok,{
			_activeTab : 0,
			initialize : function(prefs,container){
				this.callSuper(prefs,container);
			},
			construct : function()
			{
				this._tabs = $("<ul class='tabPanelTabs'></ul>");
				this._tabs.hide();
				this._content = $("<div class='tabPanelContent'></div>'");
				this._tabs.hide();
				this.callSuper();
				for(i in this._children){
					var title = (this._children[i]._prefs.title) ? this._children[i]._prefs.title : "Tab"+i;
					var tab = $('<li>'+title+'</li>').appendTo(this._tabs);
					var that = this;
					tab.attr('data-index',i);
					if(i == this._activeTab)
						tab.addClass('active');
					tab.click(function(){
						that.handleClick($(this).attr('data-index'), $(this));
					});
				}
			},
			handleClick : function(index, el){
				this._activeTab = index;
				this._content.find(' > *').hide();
				this._tabs.find('li').removeClass('active');
				el.addClass('active');
				this._children[index].show();
			},
			show: function() {
				if(!$.contains(this._obj[0],this._tabs[0])){
					this._tabs.hide().appendTo(this._obj).show();
				} else {
					this._tabs.show();
				}
				if(!$.contains(this._obj[0],this._content[0])){
					this._content.hide().appendTo(this._obj).show();
				} else {
					this._tabs.show();
				}
				
				if($.contains(this._container[0],this._obj[0]))
					this._obj.hide().show();
				else
					this._obj.hide().appendTo(this._container).fadeIn('fast');

				this._content.find(' > *').hide();
				
				
				this._children[this._activeTab].show();
				
			}
			
		});
		
		iblokz.classLinks['widget.tabpanel'] = iblokz.widget.tabpanel;
	});
