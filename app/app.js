Ext.application({
	requires : [ 'Ext.container.Viewport', 'Ext.tip.*' ],
	name : 'UM',
	appFolder : 'app',
	controllers : [ 'Users' ],
	init : function() {
		eventManager = new Ext.util.Observable();
		var tooltips = [{
	           target: 'tip1',
	           html: 'A very simple tooltip'
	      }];
		Ext.each(tooltips, function(config) {
		      Ext.create('Ext.tip.ToolTip', config);
		  });  
		Ext.QuickTips.init();
	},
	launch : function() {
		Ext.create('Ext.container.Viewport', {
			layout : {
				type : 'vbox',
				align : 'left'
			},
			items : [ {
				xtype : 'panel',
				title : 'User Details',
				width : '100%',
				flex : 3,
				items : [ {
					xtype : 'userlist',
					width : '100%',
					flex : 0
				}, {
					xtype : 'button',
					id : 'adduser',
					text : 'Add Users',
					flex : 0,
					margin : '10 0 0 0'
				} ]
			}, {
				xtype : 'panel',
				title : 'Location Map',
				width : '100%',
				flex : 3,
				items : [ {
					xtype : "component",
					scroll : true,
					monitorResize : true,
					id : "map",
					listeners : {
						render : function() {
							var self = this;
							var view = Ext.widget('usermap');
						},
						resize : function() {
							if (window.map) {
								map.updateSize();
							}
						},
						scope : {
							featurePopup : null
						}
					}
				} ]
			} ]
		});
	}
});
