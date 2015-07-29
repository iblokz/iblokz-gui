
	iblokz.initProc.push(function(){
		
		if(!iblokz.data)
			iblokz.data = {};
		
		iblokz.data.CRUD = new JS.Class({
			_source : '', // = '/api/crud.php?table=events&event=list';
			_data : [],
			_callbacks : [],
			initialize: function(prefs) {
				if(prefs['source']){
					this._source = prefs['source'];
				}
			},
			load : function(data){
			
				if(!data){
					var data = {};
				}
				
				data['action'] = 'list';
				
				var parent = this;
				
				$.ajax({
					url: this._source,
					data: data,
				}).done(function ( data ) {
					parent._data = $.parseJSON(data);
					parent.dataChanged();
				});
			},
			dataChanged : function(){
				for(i in this._callbacks){
					this._callbacks[i]();
				}
			}
		});
	});