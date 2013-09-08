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
Ext.define('TodoBrowser.PersonForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personForm',
    id : 'personForm',
    width: 600,
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
        fieldLabel: 'First Name*',
        name: 'firstName',
        allowBlank:false
    },{
        fieldLabel: 'Middle Name',
        name: 'middleName'
    },{
        fieldLabel: 'Last Name*',
        name: 'lastName',
        allowBlank:false
    }],
     
    initComponent: function(){
	    Ext.apply(this, {
		url: updatePerson,
        buttons: [{
            text: 'Save',
            scope: this,
            handler: function() {
            	Ext.getCmp('personForm').getForm().submit({
            		clientValidation: true,
            		url: this.url,
                    waitMsg: 'Submitting your data...',
          		    success: function(form, action){
          		    	showMessage("Profile updated successfully");
        		    },
        		    failure: function(form, action){
        		    	extractAndShowError(action);
        		    }
        		});
            }
        },{
            text: 'Cancel',
        	handler: function(){
        		Ext.getCmp('personForm').loadPerson();
      	   }
        }],
      });
	    this.callParent(arguments);
      },
      
      loadPerson: function() {
        var projectDetailed = Ext.ModelManager.getModel('TodoBrowser.PersonDetailed');
        projectDetailed.load('foo', {
            scope: this,
            failure: function(record, operation) {
            	showError("Error loading data.");
            },
            success: function(record, operation) {
                this.getForm().loadRecord(record);
            }
        });
      }
});



