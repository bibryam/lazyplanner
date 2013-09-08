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
Ext.define('TodoBrowser.AccountInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountInfo',  
    id: 'accountInfo',
    border : true,
    region : 'west',
    title: 'Account',
    collapsible: false,
    split: false,
    margins: '0 4 0 0',
    layout: 'fit',     
    initComponent: function(){
        Ext.apply(this, {
            items: this.createView(),
            dockedItems: this.createToolbar(),
            bbar: this.createFooterBar()
        });
        this.callParent(arguments);
    },
	
    createView: function(){
    	this.view = Ext.create('widget.accountTree');
    	return this.view;
    },
     
    createToolbar: function(){
        this.toolbar = Ext.create('widget.toolbar', {
            items: ['->', {
                iconCls: 'arrow-out',
                text: 'Expand',
                enableToggle: true,
                pressed: true,
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
            }]
        });
        return this.toolbar;
    },

    onExpandToggle: function(btn, pressed) {
        if (pressed) {
            this.view.expandAll();
        	btn.showPressed();
        } else {
            this.view.collapseAll();
        	btn.showOriginal();
        }
    },
    
    createFooterBar: function(){
    	this.footerBar =  Ext.create('Ext.ux.StatusBar', {
             id: 'project-info-statusbar',
             text: 'Menu Items',
             iconCls: 'x-status-valid'
         })
         return this.footerBar;
    },

    onTreeItemSelect: function(rec){
    	var selectEventName = rec.raw.selectEventName ? rec.raw.selectEventName : rec.parentNode.raw.selectEventName;
    	if (selectEventName) {
    		this.footerBar.setText(rec.data.text);
    		this.fireEvent(selectEventName, rec);
    	}
    } 
});
