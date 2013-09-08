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
Ext.define('TodoBrowser.StoryContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.storyContainer',
    id : 'storyContainer',
    autoScroll : true,
    border: false,
    initComponent: function(){
    	this.storyForm = Ext.create('widget.storyForm', {});
    	this.commentInfo = Ext.create('widget.commentInfo', {});
	    Ext.apply(this, {
	    	 items: [this.storyForm, this.commentInfo]
	    });
        this.relayEvents(this.storyForm, ['storyCreate', 'storyLoad'])
	    this.callParent(arguments);
      },
	  createStory: function() {
		  this.commentInfo.disable();
		  this.workEffortId = null;
		  this.storyForm.createStory();
		 // this.storyForm.expand();
	  },
	  loadStory: function(workEffortId) {
		  this.commentInfo.enable();		  
		  this.workEffortId = workEffortId;
		  this.storyForm.loadStory(workEffortId);
		  //this.storyForm.expand();
		  this.commentInfo.onBeforeexpand()
	  }
});
