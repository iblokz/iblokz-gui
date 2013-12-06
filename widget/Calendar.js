	iblokz.initProc.push(function(){
		iblokz.widget.Calendar = new JS.Class(iblokz.dom.Bean,{
			_link : 'widget.Calendar',
			_tag : '<div></div>',
			_dateTime : {},
			_monthSelect : {},
			_calendarBody : {},
			_refreshCallbacks : [],
			initialize : function(prefs,container){
				
				if(prefs.date){
					this._dateTime = new iblokz.util.DateTime(prefs.date);
				} else {
					this._dateTime = new iblokz.util.DateTime();
				}
				
				this.callSuper(prefs,container);
			},
			construct : function(){
				
				$(this._obj).html('');
				
				if(this._content === null)
					this._content = this._obj;
				
				var that = this;
				
				// month select
				this._monthSelect = $('<div class="month-select"></div>');
				var monthLabel = $('<span class="month-label"></span>');
				var butPrev = $('<button class="icon-chevron-left fleft" ></button>');
				var butNext = $('<button class="icon-chevron-right fright" ></button>');
				this._monthSelect.append(butPrev,monthLabel,butNext);
				
				monthLabel.html(this._dateTime.getDate('%F %Y'));
				
				butPrev.click(function(){
					that._dateTime.prevMonth();
					that.refreshCalendar();
				});
				
				butNext.click(function(){
					that._dateTime.nextMonth();
					that.refreshCalendar();
				});
				
				//$('.current-date').html(app.calendar.getDate('%D, %Y-%m-%d %h:%i'));
				
				this._monthSelect.appendTo(this._content);
				
				// calendar grid
				var datesList = this.generateDatesList(this._dateTime._dateObj);
				this._calendarBody = new iblokz.widget.DataGrid({
					link : 'widget.DataGrid',
					cls : 'calendar',
					header : [
						['Mon'],['Tue'],['Wed'],['Thu'],['Fri'],['Sat'],['Sun']
					],
					body : {
						'date-list' : {
							'action' : ['loop','list'],
							'recipy' : [1,2,3,4,5,6,7],
						}
					},
					data : {
						list : datesList
					}
				},this._content);
				
				this.refreshCalendar();
				
			},
			generateDatesList : function(date){
				
				if(date){
					var dateTime = new iblokz.util.DateTime(date);
				} else {
					var dateTime = new iblokz.util.DateTime();
				}
				
				var datesList = [];
				
				dateTime.firstDay();
				
				var month = dateTime.getDate('%m');
				
				var week = 0;
				
				while(dateTime.getDate('%m') == month || week > 5){
					if(!datesList[week]){
						datesList[week] = [];
					}
					
					var weekDay = dateTime.getDate('%w');
					weekDay = (weekDay == 0) ? 7 : weekDay;
					
					if(dateTime.getDate('%d')==1 && weekDay > 1){
						for(d=1; d<weekDay; d++){
							datesList[week][d-1] = ''; 
						}
					}
					datesList[week][weekDay-1] = dateTime.getDate('%d');
					if(weekDay == 7){
						week++;
					}
					
					dateTime.nextDay();
				}
				
				if(weekDay < 7){
					for(d=weekDay; d<7; d++){
						datesList[week][d] = ''; 
					}
				}
				
				return datesList;
				
			},
			refreshCalendar : function(){
				this._monthSelect.find('.month-label').html(this._dateTime.getDate('%F %Y'));
				this._calendarBody._data.list = this.generateDatesList(this._dateTime._dateObj);
				this._calendarBody.construct();
				var that = this;
				this._calendarBody._obj.find('tbody tr').each(function(){
					$(this).find('td').each(function(l){
						if($(this).html() == that._dateTime.getDate('%d')){
							$(this).addClass('curday');
						} else if(l >= 5){
							$(this).addClass('weekend');
						}
						
						if($(this).html()!=''){
							$(this).click(function(){
								that._dateTime.modify(
									[{subject:0,type:0,value:parseInt($(this).html())}]
								);
								that.refreshCalendar();
							});
						}
					});
				});
				this._calendarBody.show();
				if(this._refreshCallbacks && this._refreshCallbacks.length>0){
					for(i in this._refreshCallbacks){
						this._refreshCallbacks[i]();
					}
				}
			},
			addRefreshCallback : function(callback){
				this._refreshCallbacks.push(callback);
			},
			show: function() {
				if($.contains(this._container[0],this._obj[0]))
					this._obj.hide().fadeIn('fast');
				else
					this._obj.hide().appendTo(this._container).fadeIn('fast');
				
				this._monthSelect.show();
				this._calendarBody.show();
				
				
			},
			hide: function() {
				
				this._monthSelect.hide();
				this._calendarBody.hide();
				this._obj.hide();
			}
		});
		
		
		iblokz.classLinks['widget.Calendar'] = iblokz.widget.Calendar;
	});