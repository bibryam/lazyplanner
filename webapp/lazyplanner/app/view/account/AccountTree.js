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
Ext.define('TodoBrowser.AccountTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.accountTree',
    id: 'accountTree',
    lines: true,
    border : false,
    split: true,
    //height: 360,
    minSize: 150,
    rootVisible: false,
    autoScroll: true,
    initComponent: function(){
        Ext.apply(this, {
			root: {
		        expanded: true,
		        text:"",
		        children: [{
				    id :'account',
				    text: 'Settings',
				    iconCls:"kcontrol-3",
	                selectEventName : 'settingsHeaderSelect',				        
			        expanded: true,
	                children: [ {
				        id :'workspace-data',
		                selectEventName : 'workspaceSelect',				        
				        text: 'Account',
				        iconCls:"go-home-5",
				        leaf: true
					}, {
				        id :'personal-data',
		                selectEventName : 'personSelect',
				        text: 'Profile',
				        iconCls:"identity",
				        leaf: true
				    }, {
				        id :'password-data',
		                selectEventName : 'passwordSelect',
				        text: 'Password',
				        iconCls:"security-high-2",
				        leaf: true
				    }/*, {
				        id :'preferences',
		                selectEventName : 'preferenceSelect',				        
				        text: 'Preferences',
				        iconCls:"games-config-custom",
				        leaf: true
					}*/]
				}, {
	                id :'projects-workspace',
	                selectEventName : 'projectsHeaderSelect',
	                expanded: true,
	                text: 'Projects',
	                iconCls:"table-multiple",
	                children: workspaceProjectNodes
           		}, {
                    id :'users',
                    selectEventName : 'usersHeaderSelect',
                    expanded: true,
                    text: 'Users',
                    iconCls:"kuzer",
                    children: userNodes
           		}, {
                    id :'projects-assigned',
                    selectEventName : 'assignedProjectsHeaderSelect',
                    expanded: true,
                    text: 'Assigned Projects',
                    iconCls:"table-link",
                    children: assignedProjectNodes
           		}]
		    }
        });
        this.callParent();
        this.getSelectionModel().on({
            scope: this,
            select: this.onSelect
        });
    },
   
    onSelect: function(selModel, rec){
        if (rec) { 
        	this.ownerCt.onTreeItemSelect(rec);
        }
    }
});
