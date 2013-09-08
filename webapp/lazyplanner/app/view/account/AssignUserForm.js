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
Ext.define('TodoBrowser.AssignUserForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.assignUserForm',
    id : 'assignUserForm',
    width: 400,
    padding : 10,
    frame:true,
    border : false,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 100
    },
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
    
    items: [{
        fieldLabel: 'User Name*',
        name: 'userLoginId',
        allowBlank:false
    }],
     
    initComponent: function(){
	    Ext.apply(this, {
		url: assignWorkspaceUser,
        buttons: [{
            text: 'Save',
            scope: this,
            handler: function() {
            	Ext.getCmp('assignUserForm').getForm().submit({
            		clientValidation: true,
            		url: this.url,
            	    //params:this.extraParams,
          		    success: function(form, action){
          		    	var usersNode = Ext.getCmp('accountTree').getRootNode().findChild('id', 'users', false);
          		    	var nodeData = {
        		          dataId : action.result.person.partyId,
          		          text: action.result.person.firstName + " " + action.result.person.lastName,
          		          selectEventName : 'userSelect',
          		          iconCls: "user-edit",
          		          leaf: true
          		    	};
	          		    var newNode = usersNode.appendChild(nodeData);
	          		    newNode.raw = nodeData;
	            		form.reset();
          		        showMessage("User added to this account");
        		    },
        		    failure: function(form, action){
        		    	showError(extractErrorMessage(action));
        		    }
        		});
            }
        },{
            text: 'Cancel',
        	handler: function(){
        		Ext.getCmp('assignUserForm').getForm().reset();
      	   }
        }],
      });
	    this.callParent(arguments);
      }
});
