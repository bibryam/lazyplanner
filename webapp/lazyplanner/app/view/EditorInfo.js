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
Ext.define('TodoBrowser.EditorInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editorInfo',
    id : 'editorInfo',
    title: 'Task Editor',
    first  : 0,
    layout: 'card',
    activeItem: 0, 
    border : true,
    initComponent: function(){
    	this.storyContainer = Ext.create('widget.storyContainer', { 
    		listeners: {
	            scope: this,
	            storyLoad: this.onStoryLoad
	        }});
    	this.sprintForm = Ext.create('widget.sprintForm', {});
        Ext.apply(this, {
        	collapsible: true,
            collapsed : !showEditor,
            floatable: false,
            split: true,
        	dockedItems: [this.createToolbar()],
            items: [this.storyContainer, this.sprintForm],
            bbar: this.createFooterBar()
        });
        this.relayEvents(this.storyContainer, ['storyCreate']);
        this.relayEvents(this.sprintForm, ['sprintCreate']);
        this.callParent(arguments);
    },

	loadStory: function(workEffortId){
		this.showBusy();
	  	this.layout.setActiveItem('storyContainer');
	    this.layout.getActiveItem().loadStory(workEffortId);
	    this.layout.getActiveItem().doLayout()
	},
	  
	loadSprint: function(workEffortId){
		this.showEmptyStatus();
		this.layout.setActiveItem('sprintForm');
	    this.layout.getActiveItem().loadSprint(workEffortId);
	},
	  
	createStory: function(){
		this.showEmptyStatus();
		this.layout.setActiveItem('storyContainer');
		this.layout.getActiveItem().createStory();
	},
	  
	createSrpint: function(){
		this.showEmptyStatus();
		this.layout.setActiveItem('sprintForm');
		this.layout.getActiveItem().createSprint();
	},
  
    createToolbar: function(){
        var items = [], config = {};
        items.push({
            scope: this,
            handler: this.createStory,
            text: 'Add Task',
            iconCls: 'list-add-4'
        }, ' ');
        items.push({
            scope: this,
            handler: this.createSrpint,
            text: 'Create Task List',
            iconCls: 'window-new'
        });
        //config.cls = 'x-docked-noborder-top';
        config.items = items;
        return Ext.create('widget.toolbar', config);
    },
    
    onStoryLoad: function(value){
        var createdDate = "Created at: " + Ext.Date.format(value.get('createdStamp'), displayDateForm);
    	this.footerBar.setText(createdDate);
    },

    createFooterBar: function(){
    	this.footerBar =  Ext.create('Ext.ux.StatusBar', {
             id: 'editor-info-statusbar',
             //text: 'Info not found',
             iconCls: 'x-status-valid'
             
         });
    	 this.footerBar.showBusy();
         return this.footerBar;
    },
    
    showBusy: function(){
    	this.footerBar.showBusy();
    },
    
    showEmptyStatus: function(){
    	this.footerBar.setText("Creation time");
    }    
});
