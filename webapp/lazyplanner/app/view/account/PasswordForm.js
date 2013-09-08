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
Ext.define('TodoBrowser.PasswordForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.passwordForm',
    id : 'passwordForm',
    width: 600,
    padding : 10,
    frame:true,
    border : false,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 150
    },
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        inputType: 'password'
    },
    items: [{
        fieldLabel: 'Current Password*',
        name: 'currentPassword',
        allowBlank:false
    },{
        fieldLabel: 'New Password*',
        name: 'newPassword',
        allowBlank:false
    },{
        fieldLabel: 'New Password Verify*',
        name: 'newPasswordVerify',
        allowBlank:false
    }],
     
    initComponent: function(){
	    Ext.apply(this, {
		url: updatePassword,
        buttons: [{
            text: 'Save',
            scope: this,
            handler: function() {
            	Ext.getCmp('passwordForm').getForm().submit({
            		clientValidation: true,
            		url: this.url,
                    waitMsg: 'Submitting your data...',
            	    //params:this.extraParams,
          		    success: function(form, action){
          		    	showMessage("Password updated successfully");
        		    },
        		    failure: function(form, action){
        		    	extractAndShowError(action);
        		    }
        		});
            }
        },{
            text: 'Cancel',
        	handler: function(){
        		Ext.getCmp('passwordForm').getForm().reset();
        	}
        }],
      });
	    this.callParent(arguments);
      }
});



