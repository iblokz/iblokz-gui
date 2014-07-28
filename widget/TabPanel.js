
	iblokz.initProc.push(function(){
		iblokz.widget.TabPanel = new JS.Class(iblokz.dom.Bean,{
			_link : 'widget.TabPanel',
			_activeTab : 0,
			_cls : {
				'obj' : '',
				'tabs' : 'tabPanelTabs',
				'content' : 'tabPanelContent',
			},
			initialize : function(prefs,container){
				this.callSuper(prefs,container);
			},
			construct : function()
			{
				this._tabs = $("<ul></ul>");
				this._tabs.addClass(this._cls['tabs']);
				this._tabs.hide();
				this._content = $("<div class='tabPanelContent'></div>'");
				this._content.addClass(this._cls['content']);
				this._content.hide();
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
				if(this._activeTab == index)
					return false;
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
				$(this._tabs).sortable({axis: 'x', delay: 300, containment: "parent"});
				
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
				
				return true;
				
			}
			
		});
		
		iblokz.classLinks['widget.TabPanel'] = iblokz.widget.TabPanel;
	});
