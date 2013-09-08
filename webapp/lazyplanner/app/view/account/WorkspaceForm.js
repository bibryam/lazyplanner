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

Ext.define('TodoBrowser.WorkspaceForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workspaceForm',
    id : 'workspaceForm',
    cls: 'preview',
    width: 600,
    padding : 10,
    frame:true,
    border : false,
    fieldDefaults: {
        labelAlign: 'top',
        msgTarget: 'side'
    },
    items: [{
        xtype:'textfield',
        allowBlank: false,
        fieldLabel: 'Company Name*',
        name: 'workEffortName',
        anchor:'100%'
    }, {
        xtype: 'htmleditor',
        name: 'description',
        fieldLabel: 'Description',
        height: 130,
        anchor: '100%'
    }],
    
    initComponent: function(){
	    Ext.apply(this, {
        buttons: [{
            text: 'Save',
            formBind: true,
            scope: this,
           
            handler: function() {
            	Ext.getCmp('workspaceForm').getForm().submit({
            		clientValidation: true,
            		url: updateWorkspace,
                    waitMsg: 'Submitting your data...',
          		    success: function(form, action){
          		    	var instance = Ext.create('TodoBrowser.WorkspaceDetailed', {
      		    			workEffortId: action.result.workEffort.workEffortId,
						    workEffortName: action.result.workEffort.workEffortName,
						    description: action.result.workEffort.description
						});
          		    	form.loadRecord(instance)
          		    	showMessage("Account updated successfully");
          		    	Ext.getCmp('workspaceForm').onWorkspaceCreate(action.result.workEffort);
        		    },
        		    failure: function(form, action){
        		    	extractAndShowError(action);
        		    }
        		});
            }
        },{
            text: 'Cancel',
        	handler: function(){
        		Ext.getCmp('workspaceForm').getForm().reset();
      	   }
        }],
      });
	    this.callParent(arguments);
      },
      
	  loadWorkspace: function() {
        var workspaceDetailed = Ext.ModelManager.getModel('TodoBrowser.WorkspaceDetailed');
        workspaceDetailed.load('foo', {
            scope: this,
            failure: function(record, operation) {
            	showError("Error loading data.");
            },
            success: function(record, operation) {
                this.getForm().loadRecord(record);
            }
        });
      },

      onWorkspaceCreate: function(workEffort){
    	  Ext.getCmp('headerText').update(workEffort.workEffortName);
      }
});



