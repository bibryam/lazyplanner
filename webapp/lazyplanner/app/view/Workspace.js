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
Ext.define('TodoBrowser.Workspace', {
    extend: 'Ext.container.Viewport',
    initComponent: function(){
        Ext.apply(this, {
            layout: 'border',
            cls: 'central-region',
            padding: 0,
            items: [this.createWest(), this.createCenter(), this.createEast(), this.createFooter(), this.createHeader()]
        });
        this.callParent(arguments);
    },
    
    createEast:function() {
    	   this.editorInfo = Ext.create('widget.editorInfo', {
               region: 'east',
               width: '40%',
               listeners: {
                   scope: this,
                   storyCreate: this.onStoryCreate,
                   sprintCreate:this.onSprintCreate,
                   beforecollapse : this.onEditorCollapse,
                   expand : this.onEditorExpand
               }
           });
           return this.editorInfo;
    },
    
    createCenter: function(){
        this.sprintInfo = Ext.create('widget.sprintInfo', {
            region: 'center',
            width: '40%',
            listeners: {
                scope: this,
                storySelect: this.onStorySelect
            }
        });
        return this.sprintInfo;
    },

    createWest: function(){
        this.projectInfo = Ext.create('widget.projectInfo', {
            region: 'west',
            width: '20%',
            listeners: {
                scope: this,
                beforecollapse : this.onProjectCollapse,
                expand : this.onProjectExpand,
                sprintSelect: this.onSprintSelect,
                storySelect: this.onStorySelect,
                projectSelect: this.onProjectSelect,
                projectTreeLoad: this.onProjectTreeLoad
            }
        });
        return this.projectInfo;
    },
    
    createHeader : function() {
		return header;
	},
	
    createFooter : function() {
    	return footer;
    },

    onEditorExpand: function() {
    	savePreferenceDefered(currentProjectId, "SHOW_EDITOR", 'Y');
    },

    onEditorCollapse: function() {
		savePreferenceDefered(currentProjectId, "SHOW_EDITOR", 'N');
	},
	
    onProjectExpand: function() {
    	savePreferenceDefered(currentProjectId, "SHOW_PROJECT_TREE", 'Y');
    },

	onProjectCollapse: function() {
		savePreferenceDefered(currentProjectId, "SHOW_PROJECT_TREE", 'N');
	},
	
    onSprintSelect: function(rec){
    	var workEffortId = rec.get('workEffortId');
    	var workEffortName = rec.get('workEffortName');
        this.sprintInfo.loadSprint(workEffortId, workEffortName);
        this.editorInfo.loadSprint(workEffortId);
        savePreferenceDefered(currentProjectId, "LAST_SPRINT", workEffortId);
    },

    onProjectSelect: function(rec){
    	var workEffortId = rec.get('workEffortId');
    	var workEffortName = rec.get('text');
        this.sprintInfo.loadSprint(workEffortId, workEffortName);
    },

    onStorySelect: function(workEffortId){
    	this.editorInfo.loadStory(workEffortId);
        savePreferenceDefered(currentProjectId, "LAST_STORY", workEffortId);
    },    
    
    onStoryCreate: function(workEffort){
        this.projectInfo.reload();
        this.sprintInfo.reloadLastSprint();
    },
    
    onSprintCreate: function(workEffort){
        this.projectInfo.reload();
    },
    
    onProjectTreeLoad: function(records){
    	this.updateSprintStore(records);
    },
    
	updateSprintStore: function(records){
    	var sprintData = [];
    	for (var i = 0; i < records.length; i++){ 
    		var record = records[i]; 
        	sprintData.push({id: record.get('workEffortId'), name: record.get('workEffortName')});
    	}
    	sprintStore.loadData(sprintData);
    }
});
