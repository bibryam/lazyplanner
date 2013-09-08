Ext.define('TodoBrowser.ProjectTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.projectTree',
    rootVisible: true,
    lines: true,
    border : false,
    minWidth: 200,

    initComponent: function(){
        Ext.apply(this, {
            viewConfig: {
                getRowClass: function(record) {
                	var workEffortTypeId = record.get('workEffortTypeId');
                    if ('STORY' == workEffortTypeId) {
                    	var currentStatusId = record.get('currentStatusId');
                        return 'story-item ' + statusTreeClass(currentStatusId);
                    } else if ('SPRINT' == workEffortTypeId) {
                        return 'sprint-item';
                    } else {
                    	return 'project-item';
                    }
                }
            },
            store: Ext.create('Ext.data.TreeStore', {
                model: 'TodoBrowser.TreeData',
                root: {
                	workEffortId : currentProjectId,
                	workEffortTypeId : 'PROJECT',
                    text: currentProjectName, //needed for tree
                    workEffortName: currentProjectName, //needed event consistency
                    iconCls : 'details',//NOT WORKING
                    expanded: false
                },
                proxy: {
                    type: 'ajax',
                    url: loadTree,
                    reader: {
                        type: 'json',
                        root: 'workEfforts'
                    }
                },
                nodeParam : 'sprintId',
                listeners: {
            	load: {
            		  single: true,
                      scope: this,
                      fn: this.onFirstLoad
                    }
                }
            }),
            listeners: {
                scope: this,
                afterrender : this.onTreeRender
            }
        });
        this.callParent();
        this.getSelectionModel().on({
            scope: this,
            select: this.onSelect
        });
    },
    
    collapseSubNodes: function(){
		var root = this.store.getRootNode(); 
		root.collapseChildren();
    },
    
    onTreeRender: function(){
    	Ext.Function.defer(function(){
    		var root = this.store.getRootNode(); 
    		root.expand();
    	}, 1000, this);
    },
    
    onFirstLoad: function(store, records, successful, options){
    	if (lastSprintId) {
    		var lastRec = this.store.getNodeById(lastSprintId); 
    	}
    	if (!lastRec) {
    		lastRec = this.store.getRootNode(); 
    	}
    	this.ownerCt.onShowStatusMessage("Number of lists: " + records.childNodes.length);
    	this.getSelectionModel().select(lastRec);
    	
    	this.on({// add another load handler that will be working on all loads, not just the first
    	    load: {fn: this.onEveryLoad, scope: this}
    	});
    },
    
    onEveryLoad : function(store, node, records, successful,  eOpts ) {
    	if (successful) {
    		this.ownerCt.onEveryLoad(node, records);    	
    	} else {
    		showError("Error loading data. Please sign in again.");
    	}
    },
	
    onSelect: function(selModel, rec){
        if (rec) { 
        	if (rec == this.store.getRootNode()) {
        		this.ownerCt.onProjectSelect(rec);
        	} else if ('STORY' == rec.get('workEffortTypeId')) {
        		this.ownerCt.onStorySelect(rec);
        	} else {
        		this.ownerCt.onSprintSelect(rec);
        	}	
        }
    }
});
