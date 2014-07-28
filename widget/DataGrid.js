	iblokz.initProc.push(function(){
		iblokz.widget.DataGrid = new JS.Class(iblokz.dom.Bean,{
			_link : 'widget.DataGrid',
			_tag : '<table></table>',
			'_header' : [
			//	['Chosen option', 250 ],
			],	// header
			'_body' : {
			/*
				'article-list' : {
					'action' : ['loop','data.list'],
					'recipy' : [1,[2,'sr','<a href="">i</a>'],['>i<','','','center'],[2,'eur','','right'],[3,'','','center'],[0,'cal,eur','$2*$3','right'], [0,'cal,eur','$2+$3','right']],
					'store' : [['total','sum','$2*$3']],
				},
				'total' : {
					'action' : ['line',[]],
					'format' : [[0,'span',3],['Total:','','','right'],[0,'cal,eur','table.store.total','right']],//'get,eur','total']]
				}
			*/
			},
			'_footer' : {},
			'_data' : {},
			initialize : function(prefs,container){
				
				if(prefs['data']){
					this._data = prefs['data'];
				}
				
				this.callSuper(prefs,container);
				
				this._obj.addClass('iblokz-datagrid');
				
			},
			'getWidth' : function(obj){
				var width = 0;
				width = parseInt($(obj).css('width').replace('px',''));
				//width -= parseInt($(obj).css('padding-left').replace('px',''));
				//width -= parseInt($(obj).css('padding-right').replace('px',''));
				//width -= parseInt($(obj).css('border-left-width').replace('px',''));
				//width -= parseInt($(obj).css('border-right-width').replace('px',''));
				width += 'px';
				return width;
			},
			'copyDim' : function(obj1,obj2){
				
			},
			'editRow' : function(rowIndex){
				var tr = $(this._obj).find("tbody tr:eq("+rowIndex+")");
				var that = this;
				
				var rowData = [];
				if(this._crud){
					rowData = this._crud.prepareEdit(rowIndex);
				}
				
				var that = this;
				
				tr.find("td:not(:last-child)").each(function(l){
					
					var recipy = that._prefs['body']['item-list'].recipy[l];
					if(!recipy || typeof(recipy) == 'string' || (recipy[0] && typeof(recipy[0]) == 'string'))
						return;
					
					if(typeof(recipy)=='object' && typeof(recipy[0]) == 'number')
						var index = recipy[0]-1;
					else
						var index = recipy-1;
					
					if(rowData.length == 0){
						var val = $(this).html();
						var input;
						var width = that.getWidth(this);
						$(this).html('');
						$("<input value='"+val+"' />").css('width',width).css('height','').appendTo(this);
						//$(this).css('width',width);
						$(this).addClass('activeCell');
					} else if(rowData[index]){
						
						switch (rowData[index].prop("tagName")){
							case 'DIV':
								var height = (parseInt($(this).css('height').replace('px',''))-parseInt($(this).css('padding-top').replace('px',''))-2*parseInt($(this).css('border-bottom-width').replace('px','')));
								var width = (parseInt($(this).css('width').replace('px',''))+parseInt($(this).css('padding-left').replace('px','')));
								var padding = $(this).css('padding');
								$(this).addClass('activeCell');
								$(this).html('');
								$(this).css({'padding': 0});
								rowData[index].css({position: 'relative',display: 'inline-block', 
								  top : 0, 
								  left : 0,
								  'padding-left': padding,
								  'width' : width, 
								  'background-position': width-15,
													'height' : ''
								 }).hide().appendTo(this);
								rowData[index].show()
								$(this).addClass('activeCell');
								break;
							case 'INPUT':
								var width = that.getWidth(this);
								rowData[index].css('width',width).css('height','');
								$(this).html('');
								rowData[index].appendTo(this);
								$(this).addClass('activeCell');
								break;
							default:
								$(this).html('');
								rowData[index].appendTo(this);
								$(this).addClass('activeCell');
								break;
						}
						
					}
				});
			},
			'saveRow' : function(rowIndex){
				var tr = $(this._obj).find("tbody tr:eq("+rowIndex+")");
				var rowData = [];
				tr.find("td:not(:last-child)").each(function(i){
					var val = $(this).find("input:first").val();
					if(!val){
						val = $(this).find("select option:selected").val();
					}
					rowData.push(val);
					$(this).html(val);
					$(this).removeClass('activeCell');
				});
				this._crud.execEdit(rowData, rowIndex);
				//this.construct();
			},
			'construct' : function(){
				
				$(this._obj).html('');
				
				var that = this;
				
				// header
				this._header = $('<thead><tr></tr></thead>');
				if(this._prefs['header']){
					for(i in this._prefs['header']){
						var thPrefs = this._prefs['header'][i];
						var objTh = $('<th></th>');
						if(thPrefs[0]){
							objTh.html(thPrefs[0]);
						}
						if(thPrefs[1]){
							objTh.css('width',thPrefs[1]);
						}
						if(thPrefs[2] && thPrefs[2] == 'sortable'){
							var sortButton = $('<button class="icon-sort fright" style="background-position: right"></button>');
							//objTh.append(sortButton);
						}
						objTh.appendTo(this._header.find('> tr'));
							
					}
				}
				this._header.appendTo(this._obj);
				
				this._body = $('<tbody></tbody>');
				if(this._prefs['body']){
					for(i in this._prefs['body']){
						switch(this._prefs['body'][i].action[0]){
						case 'loop' :
								this.loop(this._prefs['body'][i].action[1], this._prefs['body'][i].recipy, this._prefs['body'][i]);
							break;
						case 'line' :
								this.line([], this._prefs['body'][i].recipy, this._prefs['body'][i]);
							break;
						}
					}
				}
				this._body.appendTo(this._obj);
				
				this._footer= $('<tfoot></tfoot>');
				this._footer.appendTo(this._obj);
				
				// add edit functionality
				$(this._obj).find("tbody tr td:last-child a[rel*=edit]").click(function(){
						
						var l = parseInt($(this).attr('rel').replace('edit-',''));	
					
						if($(this).html()=='edit'){
							$(this).html('save');
							that.editRow(l);
						} else {
							$(this).html('edit');
							that.saveRow(l);
						}
				});
				
				
				
				// create the possibility of scrolling
				
				if(this._prefs['header']){
					$(this._obj).children("thead").css('display','block');
					$(this._obj).children("tbody").css('display','block');
					var i = 0;
					
					$(this._obj).children("tbody").children("tr:first").children("td").each(function(){
						$(this).css('width',"auto");
						
						
						
						
						var width = 0;
						// fix for colspan
						var k = 1;
						if($(this).attr('colspan')){
							var k=$(this).attr('colspan');
						}
						$(that._obj).find("thead > tr > th").each(function(l){
							if(l >= i && l < i+k){
								width += parseInt($(this).css('width').replace('px',''));
								if(l > i){
									width += 17;
								}
								//alert(i+' '+k+' '+l+' '+width);
							}
							
						});
						i = i + k - 1;
							
						var thPrefs = that._prefs['header'][i];
						
						if(thPrefs[1]){
							$(this).css('width',thPrefs[1]);
						} else {
							$(this).css('width',width);
						}
						
						i++;
					});
					
				}
				
				
				
			},
			'loop' : function(link, recipy, script){
				var source = this.parseLink(link);
				if(!source)
					return false;
				for(i in source){
					this.line(source[i], recipy, script, i);
				}
			},
			'line' : function(source, recipy, script, rowIndex){
				
				if(!rowIndex)
					rowIndex = 1;
				
				var row = document.createElement('tr');
				for(ti in recipy){
					if(recipy[ti].length == null && !recipy[ti][0]){
						var cell = document.createElement('td');
						cell.innerHTML = source[recipy[ti]-1];
					} else if (typeof(recipy[ti]) == 'string') {
						var cell = document.createElement('td');
						cell.innerHTML = recipy[ti];
					} else {
						cell = this.format(recipy[ti],source,rowIndex);
					}
					
					row.appendChild(cell);
				}
				if(('store' in script) && script.store.length != 'null'){
					for(si in script.store){
						var valueToStore = this.parseLink(script.store[si][0]);
						if(valueToStore == null){
							valueToStore = 0;
						}
						
						switch(script.store[si][1]){
							case 'sum':
								valueToStore += this.format_cal(script.store[si][2],source);
								break;
						}
						
						this.saveByLink(script.store[si][0],valueToStore);
					}
				}
				
				$(row).appendTo(this._body[0]);
			},
			'parseLink' : function(link) {
				var data = this._data;
				var linkArr = link.split(".");
				for(i in linkArr){
					data = (data[linkArr[i]]) ? data[linkArr[i]] : null;
				}
				return data;
			},
			'saveByLink' : function(link, value){
				var data = this._data;
				var linkArr = link.split(".");
				for(var i = 0; i < linkArr.length - 1; i++)
				{
					data = (data[linkArr[i]])? data[linkArr[i]] : data[linkArr[i]] = {};
				}
				data[linkArr[linkArr.length-1]] = value;
			},
			'format' : function(params, rowData, rowIndex){
				var cell = document.createElement('td');
				var methods = params[1].split(',');
				
				if(params[0] != 0){
					if(typeof(params[0]) == 'string'){
						var value = params[0];
					} else {
						var value = (rowData[params[0]-1]) ? rowData[params[0]-1] : 0;
					}
				} else {
					var value = '';
				}
				
				for(mi in methods){
					switch(methods[mi]){
						case 'sr':
							break;
						case 'eur':
							value = this.format_eur(value);
							break;
						case 'cal':
							value = this.format_cal(params[2],rowData,rowIndex);
							break;
						case 'get':
							value = this.format_get(params[2]); 
						case 'span':
							cell = this.format_span(cell, params[2]);
							break;
					}
				}
				
				
				cell.innerHTML = value;
				
				if(3 in params){
					cell.setAttribute("align",params[3]);
				}
				
				return cell;
			},
			'format_sr' : function(value, srFormat){
				
			},
			'format_eur' : function(value){
				if(!value){
					value = 0;
				}
				if(typeof(value)=='string'){
					value = parseFloat(value);
				}
				return (value.toFixed(2) + ' EUR').replace('.',',');
			},
			'format_cal' : function(calFunction,data,rowIndex){
				
				do {
					calFunction = calFunction.replace('$row',rowIndex);
				} while(calFunction != calFunction.replace('$row',rowIndex));
				
				for(i in data){
					do {
						calFunction = calFunction.replace('$'+(parseInt(i)+1),data[i]);
					} while(calFunction != calFunction.replace('$'+(parseInt(i)+1),data[i]))
				}
				return eval(calFunction);
			},
			'format_get' : function(getVariable){
				return this.store[getVariable];
			},
			'format_span' : function(cell, colSpan){
				cell.colSpan = colSpan;
				return cell;
			},
			show: function() {
				if(!$.contains(this._obj[0],this._header[0])){
					this._header.hide().appendTo(this._obj).show();
				} else {
					this._header.show();
				}
				if(!$.contains(this._obj[0],this._body[0])){
					this._body.hide().appendTo(this._obj).show();
				} else {
					this._body.show();
				}
				if(!$.contains(this._obj[0],this._footer[0])){
					this._footer.hide().appendTo(this._obj).show();
				} else {
					this._footer.show();
				}
				
				return this.callSuper();
			}
			
		});
		iblokz.classLinks['widget.DataGrid'] = iblokz.widget.DataGrid;
	});