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

Ext.define('TodoBrowser.WorkspaceDetailed', {
    extend: 'Ext.data.Model',
    fields: ['workEffortId', 'workEffortName', 'currentStatusId', 'description', 'workEffortTypeId', {name: 'id', mapping: 'workEffortId'},
             {name: 'estimatedCompletionDate', mapping: 'estimatedCompletionDate', convert: dateConvert, format : 'Y-m-d', type: 'date'}],
     proxy: {
         type: 'ajax',
         url : loadWorkspace,
         reader: {
             type: 'json',
             root: 'workEffort'
         }
     }
});

Ext.define('TodoBrowser.ProjectDetailed', {
    extend: 'Ext.data.Model',
    fields: ['workEffortId', 'workEffortName', 'currentStatusId', 'description', 'workEffortTypeId', {name: 'id', mapping: 'workEffortId'},
             {name: 'estimatedCompletionDate', mapping: 'estimatedCompletionDate', convert: dateConvert, format : 'Y-m-d', type: 'date'}],
    proxy: {
        type: 'ajax',
        url : loadProject,
        reader: {
            type: 'json',
            root: 'workEffort'
        }
    }
});

Ext.define('TodoBrowser.PersonDetailed', {
    extend: 'Ext.data.Model',
    fields: ['partyId', 'firstName', 'middleName', 'lastName', {name: 'id', mapping: 'partyId'}],
    proxy: {
        type: 'ajax',
        url : loadPerson,
        reader: {
            type: 'json',
            root: 'person'
        }
    }
});

Ext.define('TodoBrowser.UserAssigmentGrid', {
    extend: 'Ext.data.Model',
    fields: ['partyId', 'workEffortId', 'workEffortName', 'rt_Description', {name: 'id', mapping: 'workEffortId'}
    ,{name: 'fromDate', mapping: 'fromDate', convert: dateConvert, format : 'Y-m-d', type: 'date'}
	,{name: 'thruDate', mapping: 'thruDate', convert: dateConvert, format : 'Y-m-d', type: 'date'}],
	proxy: {
          type: 'ajax',
          url: findUserAssigments,
          reader: {
              type: 'json',
              root: 'userAssigments'
          }
      }
});