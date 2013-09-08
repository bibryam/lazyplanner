/*
 Copyright (C) Bilgin Ibryam http://www.ofbizian.com

 This is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 2.1 of the License, or
 (at your option) any later version.

 Foobar is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with this software.  If not, see http://www.fsf.org
 */
Ext.define('TodoBrowser.FilterMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.filterMenu',
    id : 'filterMenu',
    initComponent: function(){
        Ext.apply(this, {
            items: [
                    this.createFilterOption('currentStatusId', 'Task status', 'align-left', storyStatusStore),
                    this.createFilterOption('workEffortPurposeTypeId', 'Task Type', 'align-right', storyTypeStore)]
        });
        this.callParent(arguments);
    },
    
    createFilterOption: function(fieldName, fieldDescription, iconClass, itemStore) {
    	var subMenu = Ext.create('Ext.menu.Menu', {});
    	var def = subMenu.add({
		      text: 'Any',
              filterValue : '',
		      checked: true,
		      group: fieldName,
		});
		def.on('checkchange', this.onItemCheck, this);
		itemStore.each(function(rec) {
    		var added = subMenu.add({
        	      text: rec.data.name,
                  filterValue : rec.data.id,
        	      checked: false,
        	      group: fieldName,
    		});
    		added.on('checkchange', this.onItemCheck, this);
    	}, this);
    	var menuItem = Ext.create('Ext.menu.Item', {
       	 	text: fieldDescription,
       	 	iconCls : iconClass,
       	 	menu: subMenu
    	});
        return menuItem;
    },
    
    onItemCheck: function(item, checked) {
    	if (checked) {
        	this.fireEvent('filterSelect', item);    		
    	}
    }
});
