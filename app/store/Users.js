Ext.define('UM.store.Users', {
	extend : 'Ext.data.Store',
	model: 'UM.model.User',
	proxy: {
        type: 'ajax',
        url: 'json/users.json',
        reader: {
            type: 'json',
            root: 'users'
        }
    },
    autoLoad: true
});