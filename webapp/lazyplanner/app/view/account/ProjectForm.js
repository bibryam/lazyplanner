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
Ext.define('TodoBrowser.ProjectForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.projectForm',
    id : 'projectForm',
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
        xtype: 'container',
        anchor: '100%',
        layout:'column',
        items:[{
            xtype: 'container',
            columnWidth:.8,
            layout: 'anchor',
            items: [{
                xtype:'textfield',
                allowBlank: false,
                fieldLabel: 'Title*',
                name: 'workEffortName',
                anchor:'96%'
            }]
        },{
            xtype: 'container',
            columnWidth:.2,
            layout: 'anchor',
            items: [{
                xtype: 'datefield',
                format : 'Y-m-d',
                fieldLabel: 'Due Date',
                name: 'estimatedCompletionDate',
                anchor:'100%'
            }]
        }]
    }, {
        xtype: 'htmleditor',
        name: 'description',
        fieldLabel: 'Description',
        height: 130,
        anchor: '100%'
    }],
    
    initComponent: function(){
	    Ext.apply(this, {
		url: createProject,
        buttons: [{
            text: 'Save',
            id : 'projectFormSave',
            scope: this,
            handler: function() {
            	Ext.getCmp('projectForm').getForm().submit({
            		clientValidation: true,
            		url: this.url,
            	    params:this.extraParams,
          		    success: function(form, action) {
          		    	var projectNode = Ext.getCmp('accountTree').getRootNode().findChild('id', 'projects-workspace', false);
          		    	var workEffortId = action.result.workEffort.workEffortId;
          		    	var workEffortName = action.result.workEffort.workEffortName;
          		    	var description = action.result.workEffort.description;

          		    	//update existing node
          		    	if (this.url === updateProject) {
          		    		var existingNode = projectNode.findChild('id', 'wp-' + workEffortId, false);
              		    	if (existingNode != undefined) {
              		    		existingNode.data.text = workEffortName;
        	          		    projectNode.appendChild(existingNode);
              		    	}
              		    	var existingMenuItem = projectMenu.menu.items.getByKey(workEffortId);
              		    	if (existingMenuItem != undefined) {
              		    		existingMenuItem.setText(workEffortName);
              		    	}
              		    	
              		    	//store for assign user form
              		    	var existingProjectItem = workspaceProjectStore.getById(workEffortId);
              		    	if (existingProjectItem != undefined) {
              		    		workspaceProjectStore.remove(existingProjectItem);
                  		    	workspaceProjectStore.add({id: workEffortId, name : workEffortName});
              		    	}

              		    	var instance = Ext.create('TodoBrowser.WorkspaceDetailed', {
          		    			workEffortId: workEffortId,
    						    workEffortName: workEffortName,
    						    description: description
    						});
              		    	form.loadRecord(instance);
              		    	//Ext.getCmp('projectForm').loadProject(workEffortId);
              		    	
              		        showMessage("Project updated");
              				return;
          		    	}
          		    	
          		    	var nodeData = {
          		    		id : 'wp-' + workEffortId,
          		    		dataId : workEffortId,
          		    		text: workEffortName,
          		    		selectEventName: 'projectSelect',
          		    		iconCls: 'table-multiple',
          		    		leaf: true
          		    	};
	          		    var newNode = projectNode.appendChild(nodeData);
	          		    newNode.raw = nodeData;
	          		    
          		    	//update project drodown
          		    	projectMenu.menu.add({
          		    		id : workEffortId,
                            text: workEffortName,
                            iconCls : 'bullet-green',
                            handler : function() {
                            	gotoURL(workspaceURL + '?projectId=' + workEffortId);
                            }
          		    	});
          		    	
          		    	//store for user assign form
          		    	workspaceProjectStore.add({id: workEffortId, name : workEffortName});
          		    	
          		    	form.reset();
          		        showMessage("New project created");
          		    	Ext.getCmp('projectForm').onProjectCreate();
          		    },
        		    failure: function(form, action){
        		    	extractAndShowError(action);
        		    }
        		});
            }
        },{
            text: 'Cancel',
            id : 'projectFormCancel',
        	handler: function(){
        		Ext.getCmp('projectForm').getForm().reset();
      	   }
        }],
      });
	    this.callParent(arguments);
      },
      
	  newProject: function() {
		  this.url = createProject;
		  this.extraParams = {};
		  this.getForm().reset();
	  },
	  
	  makeReadOnly : function() {
		  var projectFormSave = Ext.ComponentQuery.query('#projectForm button[id = "projectFormSave"]');
		  projectFormSave[0].hide();
		  var projectFormCancel = Ext.ComponentQuery.query('#projectForm button[id = "projectFormCancel"]');
		  projectFormCancel[0].hide();		  
	  },
    
      loadProject: function(workEffortId) {
    	this.url = updateProject;
    	this.extraParams = {workEffortId : workEffortId};
        var projectDetailed = Ext.ModelManager.getModel('TodoBrowser.ProjectDetailed');
        projectDetailed.load(workEffortId, {
            scope: this,
            failure: function(record, operation) {
            	showError("Error loading data.");
            },
            success: function(record, operation) {
                this.getForm().loadRecord(record);
            },
            callback: function(record, operation) {
            }
        });
      },

      onProjectCreate: function(){
          this.fireEvent('projectCreate', this);
    	  //refreshPage(); 
    }
});



