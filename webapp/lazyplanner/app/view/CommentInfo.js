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
Ext.define('TodoBrowser.CommentInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.commentInfo',
    id : 'commentInfo',
    border: false,
    title: 'Task Comments',
    iconCls: 'nav',
    initComponent: function(){
	    Ext.apply(this, {
	    	items: [
	            this.createGrid(),
	            this.createForm()
	            ],
	        listeners: {
                scope: this,
                activate : this.onBeforeexpand
            }
	    });
	    this.callParent(arguments);
      },

      createGrid: function(){
          this.commentGrid = Ext.create('widget.commentGrid', {});
          return this.commentGrid;
      },

      createForm: function(){
          this.commentForm = Ext.create('widget.commentForm', {
              border: false,
          });
          return this.commentForm;
      },
      
      onCommentCreate: function(){
    	  this.remove(this.commentGrid)
    	  this.insert(0, this.createGrid())
		  this.commentGrid.load(this.ownerCt.workEffortId);
      },
      
      onBeforeexpand: function(){
    	  this.onCommentCreate()
    	  if (this.ownerCt.workEffortId) {
    		  this.commentGrid.load(this.ownerCt.workEffortId);
    		  this.commentForm.workEffortId = this.ownerCt.workEffortId;
    	  } else {
    		  alert('NO WE???');
    		  return false;
    	  }
      }
});
