var tableData = {
	id : 'data-table',
	items : [
		{
			link : 'dom.Table',
			items : [
				{
					link : 'dom.Tr',
					items : [
						{ link : 'dom.Td', html : 'id' },
						{ link : 'dom.Td', html : 'title' },
						{ link : 'dom.Td', html : 'date' }
					]
				},
				{
					link : 'dom.Tr',
					items : [
						{ link : 'dom.Td', html : '1' },
						{ link : 'dom.Td', html : 'Test Test' },
						{ link : 'dom.Td', html : '17.08.1976' }
					]
					
				}
			]
		}
	]
};

var tabPanelData = {
	id : 'tab-panel',
	items : [
		{
			title : 'DataGrid',
			link : 'widget.DataGrid',
			header : [
				['#',30],['Article',100],['Sngl. Price', 75],['Amount',50],['Total Price',75]
			],
			body : {
				'item-list' : {
					'action' : ['loop','list'],
					'recipy' : [1,2,[3,'eur','','right'],[4,'','','center'],[0,'cal,eur','$3*$4','right']],
					'store' : [['total','sum','$3*$4'],['totalAmount','sum','$4+0']]
				},
				'total' : {
					'action' : ['line',[]],
					'recipy' : [[0,'span',2],['Total:','','','right'],[0,'cal','this._data.totalAmount','right'],[0,'cal,eur','this._data.total','right']],//'get,eur','total']]
				}
			},
			'data' : {
				'total' : 0,
				'list' : [
					[1, 'Item 1', 35,2],
					[2, 'Item 2', 35,1],
					[3, 'Item 3', 35,4],
				],
			}
		},
		{
			title : 'Table2',
			link : 'dom.Table',
			items : [
				{
					link : 'dom.Tr',
					items : [
						{ link : 'dom.Td', html : 'id' },
						{ link : 'dom.Td', html : 'title' },
						{ link : 'dom.Td', html : 'date' }
					]
				},
				{
					link : 'dom.Tr',
					items : [
						{ link : 'dom.Td', html : '1' },
						{ link : 'dom.Td', html : 'Test2 Test2' },
						{ link : 'dom.Td', html : '17.08.2001' }
					]
					
				}
			]
		},
		{
			link : 'dom.Bean',
			title : 'Tab Panel 2',
			html : 'some html here',
			items : [
				{
					link : 'widget.TabPanel',
					items : [
						{
							link : 'dom.Form',
							title : 'Form',
							items : [
								{ link : 'dom.Input' },						
								{ link : 'dom.Input' },
								{ link : 'dom.Input' }
							]
						}
					]
				},
				{
					link : 'widget.TabPanel',
					items : [
						{
							link : 'dom.Form',
							title : 'Form',
							items : [
								{ link : 'dom.Input' },						
								{ link : 'dom.Input' },
								{ link : 'dom.Input' }
							]
						},
						{
							link : 'dom.Form',
							title : 'Form 2',
							items : [
								{ link : 'dom.Input' },						
								{ link : 'dom.Input' },
								{ link : 'dom.Input' }
							]
						}
					]
				}
			]
		}
	]
}
