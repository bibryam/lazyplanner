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
Ext.define('TodoBrowser.CommentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.commentForm',
    id : 'commentForm',
    border: false,
    bodyPadding: '10px',
    anchor:'100%',
    fieldDefaults: {
        labelAlign: 'top',
        msgTarget: 'under',//side
        //labelWidth: 100,
        labelStyle: 'font-weight:bold'
    },
    defaults: {
        margins: '0 0 10 0'
    },

    items: [
	//{
    //    xtype: 'textfield',
    //    fieldLabel: 'Subject',
    //    allowBlank: false
    //},
    {
        anchor:'100%',
    	xtype: 'textarea',
        name: 'noteInfo',
        grow      : true,
        fieldLabel: 'Comment*',
        emptyText: 'Your comment for this task',
        allowBlank: false
    }],
          
    initComponent: function(){
	    Ext.apply(this, {
        buttons: [{
            text: 'Save',
            scope: this,
            handler: function() {
            	Ext.getCmp('commentForm').getForm().submit({
            		clientValidation: true,
            		url: createComment,
            	    params:{workEffortId : this.workEffortId},
          		    success: function(form, action){
          		    	form.reset();
          		    	showMessage("Comment added successfully");
          		    	Ext.getCmp('commentForm').onCommentCreate();
        		    },
        		    failure: function(form, action){
       		    		extractAndShowError(action);
        		    }
        		});
            }
        },{
            text: 'Cancel',
        	handler: function(){
        		//Ext.getCmp('commentForm').getForm().reset();
                this.up('commentForm').getForm().reset();
      	   }
        }],
      });
	    this.callParent(arguments);
      },
      
      onCommentCreate: function() {
  		this.ownerCt.onCommentCreate();
      }
});



