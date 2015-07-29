
		iblokz.initProc.push(function(){
			
			if(!iblokz.util)
				iblokz.util = {};
		
			iblokz.util.DateTime = new JS.Class({
				_dateObj : {},
				_monthsArray : ['January','February','March','April','May','June','July',
								  'August','September','October','November','December'],
				_daysOfWeekArray : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
				_shortDaysOfWeekArray : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
				initialize : function(date){
					if(date){
						this._dateObj = new Date(date);
					} else {
						this._dateObj = new Date();
					}
				},
				setDate : function(date){
					if(date){
						this._dateObj = new Date(date);
					}
				},
				modify : function(recipy){
					/*
						structure:
						[	
							{
								subject: 0, type: 0, value: 1
							}
						]
						subject: day, month, year, hours, minutes
						type: =,+,-
					*/
					
					// todo: create a modifier util
					var modifiers = [
						function(value1, value2){
							return value2;
						},
						function(value1, value2){
							return value1+value2;
						},
						function(value1, value2){
							return value1-value2;
						},
					];
					
					var month = this._dateObj.getMonth();
					var year = this._dateObj.getFullYear();
					var day = this._dateObj.getDate();
					var hours = this._dateObj.getHours();
					var minutes = this._dateObj.getMinutes();
					
					for(i in recipy){
						switch(recipy[i].subject){
							case 0: // day
								day = modifiers[recipy[i].type](day,recipy[i].value);
								break;
							case 1: // month
								month = modifiers[recipy[i].type](month,recipy[i].value);
								break;
							case 2: // year
								year = modifiers[recipy[i].type](year,recipy[i].value);
								break;
							case 3: // hours
								hours = modifiers[recipy[i].type](hours,recipy[i].value);
								break;
							case 4: // minutes
								minutes = modifiers[recipy[i].type](minutes,recipy[i].value);
						}
					}
				
					this._dateObj = new Date(year, month, day, hours, minutes);
				
					return;
				
					if((month+'').length == 1){
						 month = '0'+month;
					}
					
					if((day+'').length == 1){
						 day = '0'+day;
					}
					
					// hours
					if((hours+'').length == 1){
						 hours = '0'+hours;
					}
					
					// minutes
					if((minutes+'').length == 1){
						 minutes = '0'+minutes;
					}
					
					var dateStr = year+'-'+
						month+'-'+day+' '+hours+':'+minutes;
					
					this._dateObj = new Date(dateStr);
					
				},
				firstDay : function(){
					var recipy = [];
					recipy.push({subject:0,type:0,value:1}); //day=1;
					this.modify(recipy);
				},
				nextDay : function(){
					var recipy = [];
					recipy.push({subject:0,type:1,value:1}); //day+=1;
					this.modify(recipy);
				},
				prevDay : function(){
					var recipy = [];
					recipy.push({subject:0,type:2,value:1}); //day-=1;
					this.modify(recipy);
				},
				nextMonth : function(){
					
					var recipy = [];
					recipy.push({subject:1,type:1,value:1}); //month++;
					this.modify(recipy);
					
					return;
					var month = this._dateObj.getMonth()+1;
					var year = this._dateObj.getFullYear();
					var day = this._dateObj.getDate();
					
					
					
					if(month == 12){
						recipy.push({subject:1,type:0,value:1}); //month=1;
						recipy.push({subject:2,type:1,value:1}); //year++;
					} else {
						recipy.push({subject:1,type:1,value:1}); //month++;
					}
					
					this.modify(recipy);
					
				},
				prevMonth : function(){
					
					var recipy = [];
					recipy.push({subject:1,type:2,value:1}); //month--;
					this.modify(recipy);
					
					return;
					
					var month = this._dateObj.getMonth()+1;
					var year = this._dateObj.getFullYear();
					var day = this._dateObj.getDate();
					
					if(month == 1){
						recipy.push({subject:1,type:0,value:12});//month=12;
						recipy.push({subject:2,type:2,value:1});//year--;
					} else {
						recipy.push({subject:1,type:2,value:1});//month--;
					}
					
					this.modify(recipy);
				},
				getMonth : function(){
					return this._dateObj.getMonth();
				},
				getDate : function(format){
					if(!format)
						return this._dateObj.toString();
					
					var dateStr = format;
					
					// year
					dateStr = dateStr.replace('%Y',this._dateObj.getFullYear());
					
					// month
					var month = this._dateObj.getMonth()+1;
					dateStr = dateStr.replace('%F',this._monthsArray[month-1]);
					
					if((month+'').length == 1){
						 month = '0'+month;
					}
					
					dateStr = dateStr.replace('%m',month);
					
					// day
					var day = this._dateObj.getDate();
					if((day+'').length == 1){
						 day = '0'+day;
					}
					
					dateStr = dateStr.replace('%d',day);
					
					// day of the week
					var dayOfTheWeek = this._dateObj.getDay();
					
					dateStr = dateStr.replace('%w',dayOfTheWeek); // 0-6
					dateStr = dateStr.replace('%N',(dayOfTheWeek == 0 ) ? 7 : dayOfTheWeek); // 1-7
					
					dateStr = dateStr.replace('%l',this._shortDaysOfWeekArray[dayOfTheWeek]); // Mon, Tue ...
					dateStr = dateStr.replace('%D',this._daysOfWeekArray[dayOfTheWeek]); // Monday, Tuesday
					
					
					// hours
					var hours = this._dateObj.getHours();
					if((hours+'').length == 1){
						 hours = '0'+hours;
					}
					
					dateStr = dateStr.replace('%h',hours);
					
					// minutes
					var minutes = this._dateObj.getMinutes();
					if((minutes+'').length == 1){
						 minutes = '0'+minutes;
					}
					
					dateStr = dateStr.replace('%i',minutes);
					
					return dateStr;
					
				}
					
			});
			
		});