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
Ext.define('TodoBrowser.AccountHelp', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.accountHelp',
    id : 'accountHelp',
    activeTab: 0,
    width: 600,
    padding : 10,
    frame:true,
    border : false,
    height: 250,
    plain: true,
    defaults :{
        autoScroll: true,
        bodyPadding: 10
    },
    items: [{
   	 	title: 'Start',
   	 	loader: {
             url: 'accountHelp',
             contentType: 'html',
             autoLoad: true,
             loadMask: true,
             baseParams: {page: 'start'}
   	 	}
    },{
   	 	title: 'Settings',
   	 	loader: {
             url: 'accountHelp',
             contentType: 'html',
             autoLoad: true,
             loadMask: true,
             baseParams: {page: 'settings'}
   	 	}
    },{
    	title: 'Projects',
   	 	loader: {
             url: 'accountHelp',
             contentType: 'html',
             autoLoad: true,
             loadMask: true,
             baseParams: {page: 'projects'}
   	 	}
    },{
    	title: 'Users',
   	 	loader: {
             url: 'accountHelp',
             contentType: 'html',
             autoLoad: true,
             loadMask: true,
             baseParams: {page: 'users'}
   	 	}
    },{
    	title: 'Assigned Projects',
   	 	loader: {
             url: 'accountHelp',
             contentType: 'html',
             autoLoad: true,
             loadMask: true,
             baseParams: {page: 'assignedProjects'}
   	 	}
    }],
    
    loadSettings : function() {
    	this.setActiveTab(1);
	},
	
	loadAccount : function() {
    	this.setActiveTab(2);
	},
	
	loadUsers : function() {
    	this.setActiveTab(3);
	},
	
	loadAssignedProjects : function() {
    	this.setActiveTab(4);
	}
});
