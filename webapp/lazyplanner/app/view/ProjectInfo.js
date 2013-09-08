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
Ext.define('TodoBrowser.ProjectInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.projectInfo',  
    border : true,
    initComponent: function(){
        Ext.apply(this, {
            collapsible: true,
            collapsed : !showProjectTree,
            floatable: false,
            split: true,
            layout: 'fit',
            title: 'Project Preview',
            animCollapse: true,
            items: this.createView(),
            dockedItems: this.createToolbar(),
            bbar: this.createFooterBar()
        });
        this.addEvents('hideSprint', 'storySelect', 'sprintSelect', 'projectSelect', 'projectTreeLoad');
        this.callParent(arguments);
    },
    
    reload : function() {
		this.view.store.load({
		    scope   : this,
		    callback: function(records, operation, success) {
		    	if (this.expandCollapseButton.pressed) {
		            this.view.expandAll();
		    	}
		    }
		});
	},
	
    createView: function(){
        this.view = Ext.create('widget.projectTree');
        return this.view;
    },
     
    createToolbar: function(){
        this.createActions();
        this.toolbar = Ext.create('widget.toolbar', {
            items: [//this.hideSprintAction,
                    '->',
                    this.expandCollapseButton]
            
        });
        return this.toolbar;
    },

    createActions: function(){
        this.hideSprintAction = Ext.create('Ext.Action', {
            itemId: 'hideSprint',
            scope: this,
            handler: this.onHideSprintClick,
            text: 'Hide Old',
            iconCls: 'view-history'
        });
        this.expandCollapseButton = Ext.create('Ext.Button', {
            iconCls: 'arrow-out',
            text: 'Expand',
            enableToggle: true,
            pressed: false,
            scope: this,
            toggleHandler: this.onExpandToggle,
            showPressed : function() {
            	this.setText("Collapse");
            	this.setIconCls("arrow-in");
            },
            showOriginal : function() {
            	this.setText("Expand");
            	this.setIconCls("arrow-out");
            }
        });
    },
    
    createFooterBar: function(){
    	this.footerBar =  Ext.create('Ext.ux.StatusBar', {
             id: 'project-info-statusbar',
             //text: 'Task list size',
             iconCls: 'x-status-valid',
             //items: ['Plain Text']
         })
         this.footerBar.showBusy();
         return this.footerBar;
    },
    
    onExpandToggle: function(btn, pressed) {
        if (pressed) {
            this.view.expandAll();
        	btn.showPressed();
        } else {
            //this.view.collapseAll();
        	this.view.collapseSubNodes();
        	btn.showOriginal();
        }
    },
    
    onShowStatusMessage: function(message){
    	this.footerBar.setText(message);
    },
    
    onProjectSelect: function(rec){
    	this.fireEvent('projectSelect', rec);
    },
    
    onSprintSelect: function(rec){
    	this.fireEvent('sprintSelect', rec);
    },

    onStorySelect: function(rec){ 
    	this.fireEvent('storySelect', rec.get('workEffortId'));
    },
    
    onEveryLoad: function(node, records){ 
    	//fire only root node loads for now, sprint loads are not needed
    	var workEffortId = node.get("workEffortId");

    	if (workEffortId === currentProjectId) {
    		this.fireEvent('projectTreeLoad', records);
    	}
    },
    
    getSelectedItem: function(){
        return this.view.getSelectionModel().getSelection()[0] || false;
    },

    onHideSprintClick: function(){
        var active = this.menu.activeFeed || this.getSelectedItem();
        this.fireEvent('hideSprint', this, active.get('title'), active.get('url'));
    }
});
