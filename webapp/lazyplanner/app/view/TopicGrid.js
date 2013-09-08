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
Ext.define('ProjectBrowser.TopicGrid', {

    extend: 'Ext.grid.Panel',
    
    alias: 'widget.topicgrid',
    
    initComponent: function(){
        var store = Ext.create('Ext.data.Store', {
            model: 'ProjectBrowser.Topic',
            remoteSort: true,
            sorters: [{
                property: 'workEffortName',
                direction: 'DESC'
            }],
            proxy: {
                simpleSortMode: true,
                type: 'ajax',
                url: 'findIterationStories',
                reader: {
                    type: 'json',
                    root: 'workEfforts',
                    totalProperty: 'totalCount'
                }
            }
        });
        
        Ext.apply(this, {
            store: store,
            viewConfig: {
                plugins: [{
                    pluginId: 'preview',
                    ptype: 'preview',
                    bodyField: 'excerpt',
                    expanded: true
                }]
            },
            selModel: Ext.create('Ext.selection.RowModel', {
                mode: 'SINGLE',
                listeners: {
                    scope: this,
                    select: this.onSelect
                }    
            }),
            columns: [
            {
                header: 'Topic',
                dataIndex: 'workEffortName',
                flex: 1,
                renderer: function(value, o, record) {
                     return Ext.String.format('<div class="topic"><b>{0}</b><span class="author">{1}</span></div>',
                         value, record.get('workEffortName'));
                }
            }, {
                header: 'Author',
                dataIndex: 'description',
                width: 100
                //hidden: true
            }, {
                header: 'Replies',
                dataIndex: 'sequenceNum',
                width: 70,
                align: 'right'
            }
            
           /* , {
                header: 'Last Post',
                dataIndex: 'lastpost',
                width: 150,
                renderer: function(value, o, rec){
                    return Ext.String.format('<span class="post-date">{0}</span><br/>by {1}', Ext.Date.format(value, 'M j, Y, g:i a'), rec.get('lastposter'));
                }
            }*/
            ],
            dockedItems: [{
                xtype: 'toolbar',
                cls: 'x-docked-noborder-top',
                items: [
                        
                {
                    text: 'New Topic',
                    iconCls: 'icon-new-topic',
                    handler: function(){
                        alert('Not implemented');
                    }
                }, '-', {
                    text: 'Preview Pane',
                    iconCls: 'icon-preview',
                    enableToggle: true,
                    pressed: true,
                    scope: this,
                    toggleHandler: this.onPreviewChange
                }, {
                    text: 'Summary',
                    iconCls: 'icon-summary',
                    enableToggle: true,
                    pressed: true,
                    scope: this,
                    toggleHandler: this.onSummaryChange
                }]
            }, {
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true,
                displayMsg: 'Displaying topics {0} - {1} of {2}',
                emptyMsg: 'No topics to display'
            }]
        });
        this.callParent();
    },
    
    onSelect: function(selModel, rec){
        this.ownerCt.onSelect(rec);
    },
    
    loadForum: function(id){
        var store = this.store;
        store.getProxy().extraParams.workEffortParentId = id;
        store.loadPage(1);
    },
    
    onPreviewChange: function(btn, pressed){
        this.ownerCt.togglePreview(pressed);
    },
    
    onSummaryChange: function(btn, pressed){
        this.getView().getPlugin('preview').toggleExpanded(pressed);
    }
});
