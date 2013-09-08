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
Ext.define('TodoBrowser.TreeData', {
    extend: 'Ext.data.Model',
    idProperty: 'workEffortId',
    fields: ['workEffortId', 'workEffortName', 'workEffortPurposeTypeId', 'currentStatusId', 'workEffortTypeId', {name: 'text', mapping: 'workEffortName'},
             {name: 'leaf', convert: leafConvert}, {name: 'iconCls', convert: treeIconClsConvert}]
});
 
Ext.define('TodoBrowser.StoryGrid', {
    extend: 'Ext.data.Model',
    fields: ['workEffortId', 'workEffortName', 'workEffortPurposeTypeId', 'currentStatusId', 'workEffortTypeId', {name: 'id', mapping: 'workEffortId'},
             {name: 'estimatedCompletionDate', mapping: 'estimatedCompletionDate', convert: dateConvert, format : 'Y-m-d', type: 'date'},
             {name: 'priority', mapping: 'priority', type: 'string'}, 'showAsEnumId', 'currentPartyId', 'description']
});

Ext.define('TodoBrowser.StoryDetailed', {
    extend: 'Ext.data.Model',
    fields: ['workEffortId', 'workEffortName', 'workEffortPurposeTypeId', 'currentStatusId', 'workEffortTypeId', 'workEffortParentId', 'showAsEnumId', 'currentPartyId', 'description',
             {name: 'id', mapping: 'workEffortId'}, {name: 'estimatedCompletionDate', mapping: 'estimatedCompletionDate', convert: dateConvert, format : 'Y-m-d', type: 'date'},
             {name: 'priority', mapping: 'priority', type: 'string'}, {name: 'lastUpdatedStamp', mapping: 'lastUpdatedStamp', convert: dateConvert, format : 'Y-m-d', type: 'date'},
             {name: 'createdStamp', mapping: 'createdStamp', convert: dateConvert, format : 'Y-m-d', type: 'date'}],
    proxy: {
        type: 'ajax',
        url : loadStory,
        reader: {
            type: 'json',
            root: 'workEffort'
        }
    }
});

Ext.define('TodoBrowser.SprintDetailed', {
    extend: 'Ext.data.Model',
    fields: ['workEffortId', 'workEffortName', 'description', 'workEffortTypeId', {name: 'id', mapping: 'workEffortId'},
             {name: 'estimatedCompletionDate', mapping: 'estimatedCompletionDate',convert: dateConvert, format : 'Y-m-d', type: 'date'},
             {name: 'lastUpdatedStamp', mapping: 'lastUpdatedStamp', convert: dateConvert, format : 'Y-m-d', type: 'date'},
             {name: 'createdStamp', mapping: 'createdStamp', convert: dateConvert, format : 'Y-m-d', type: 'date'}],
    proxy: {
        type: 'ajax',
        url : loadSprint,
        reader: {
            type: 'json',
            root: 'workEffort'
        }
    }
});

Ext.define('TodoBrowser.CommentGrid', {
    extend: 'Ext.data.Model',
    fields: ['workEffortId', 'noteId', 'noteName', 'noteInfo', 'noteParty', {name: 'id', mapping: 'noteId'},
             {name: 'noteDateTime', mapping: 'noteDateTime', convert: dateConvert, format : 'Y-m-d', type: 'date'}],
     proxy: {
         type: 'ajax',
         url: loadComments,
         reader: {
             type: 'json',
             root: 'notes'
         }
     },
     pageSize : 1000
});
