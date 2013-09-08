<#--
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
-->
<script type="text/javascript">
var createProject = "<@ofbizUrl>createProject</@ofbizUrl>";
var updateProject = "<@ofbizUrl>updateProject</@ofbizUrl>";
var loadProject = "<@ofbizUrl>loadProject</@ofbizUrl>";   
var findUserAssigments = "<@ofbizUrl>findUserAssigments</@ofbizUrl>";
var createUserAssigment = "<@ofbizUrl>createUserAssigment</@ofbizUrl>";
var deleteUserAssigment = "<@ofbizUrl>deleteUserAssigment</@ofbizUrl>";
var loadPerson = "<@ofbizUrl>loadPerson</@ofbizUrl>";
var updatePerson = "<@ofbizUrl>updatePerson</@ofbizUrl>";
var updatePassword = "<@ofbizUrl>updatePassword</@ofbizUrl>";
var loadWorkspace = "<@ofbizUrl>loadWorkspace</@ofbizUrl>";
var updateWorkspace = "<@ofbizUrl>updateWorkspace</@ofbizUrl>";
var assignWorkspaceUser = "<@ofbizUrl>assignWorkspaceUser</@ofbizUrl>";

//project tree children 
var workspaceProjectNodes =[
{
id :'new-project',
selectEventName : 'newProject',
text: 'Add New Project',
iconCls:"table-add",
leaf: true
}
<#if workspaceProjects?exists && workspaceProjects?has_content>,
<#list workspaceProjects as project>
    {   id : 'wp-' + '${project.workEffortId}',
        dataId :'${project.workEffortId}',
        text:'${project.workEffortName?default("")}',
        selectEventName : 'projectSelect',
        iconCls:"table-edit",
        leaf: true
    }<#if project_has_next>, </#if>
</#list>
</#if>
];

var assignedProjectNodes =[
<#if assignedProjects?exists && assignedProjects?has_content>
<#list assignedProjects as project>
    {
        dataId :'${project.workEffortId}',
        text:'${project.workEffortName?default("")}',
        selectEventName : 'assignedProjectSelect',
        iconCls:"table-key",
        leaf: true
    }<#if project_has_next>, </#if>
</#list>
</#if>
];
var userNodes = [
{
id :'assing-user',
selectEventName : 'assignUserSelect',
text: 'Add New User',
iconCls:"user-add",
leaf: true
}
<#if workspaceParties?exists && workspaceParties?has_content>,
<#list workspaceParties as user>
    {
        dataId :'${user.partyId}',
        text:'${user.firstName?default("")} ${user.lastName?default("")}',
        selectEventName : 'userSelect',
        iconCls: "user-edit",
        leaf: true
    }<#if user_has_next>, </#if>
</#list>
</#if>
];

var filterTypes = [
    ['all', 'All '], 
    ['assignee', 'Assignee '], 
    ['component', 'Component'], 
    ['release', 'Release'],
    ['workEffortPurposeTypeId', 'Type '], 
];

var filterTypeStore = new Ext.data.ArrayStore({
   fields: ['id', 'name'],
   data : filterTypes
});
<#--
//project role types
var roleData = 
<#if projectRoles?exists && projectRoles?has_content>
[<#list projectRoles as projectRole>
{id: '${projectRole.roleTypeId?default("")}', name: '${projectRole.description?default("NA")}'}<#if projectRole_has_next>, </#if>
</#list>];
<#else>
[];
</#if>

var roleStore = Ext.create('Ext.data.Store', {
    model: 'GenericIdName',
    data: roleData
});
-->
//workspace project
var workspaceProjectData = 
<#if workspaceProjects?exists && workspaceProjects?has_content>
[<#list workspaceProjects as workspaceProject>
{id: '${workspaceProject.workEffortId?default("")}', name: '${workspaceProject.workEffortName?default("NA")}'}<#if workspaceProject_has_next>, </#if>
</#list>];
<#else>
[];
</#if>

var workspaceProjectStore = Ext.create('Ext.data.Store', {
    model: 'GenericIdName',
    data: workspaceProjectData
});
</script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/model/AccountModels.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/WorkspaceForm.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/UserForm.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/AssignUserForm.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/AccountHelp.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/PasswordForm.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/PersonForm.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/ProjectForm.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/AccountEditor.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/AccountTree.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/AccountInfo.js</@ofbizContentUrl>"></script>
<script type="text/javascript" src="<@ofbizContentUrl>/app/view/account/Account.js</@ofbizContentUrl>"></script>

<script type="text/javascript">
    Ext.Loader.setConfig({enabled: true});
    Ext.Loader.setPath('Ext.ux', '<@ofbizContentUrl>/ext-4.0.0/examples/ux/</@ofbizContentUrl>');
    Ext.Loader.setPath('Ext.ux.statusbar', '<@ofbizContentUrl>/ext-4.0.0/examples/ux/statusbar</@ofbizContentUrl>');    
    Ext.Loader.setPath('Ext.ux.layout', '<@ofbizContentUrl>/ext-4.0.0/examples/ux/layout</@ofbizContentUrl>');    
    
    Ext.require([
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.data.*',
        'Ext.toolbar.*',
        'Ext.util.*',
        'Ext.Action',
        'Ext.tab.*',
        'Ext.button.*',
        'Ext.form.*',
        'Ext.layout.container.Card',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',      
        'Ext.ux.PreviewPlugin', 
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.layout.Center'          
    ]);
    Ext.onReady(function(){
        Ext.QuickTips.init();
        var app = new TodoBrowser.Account();
    });
</script>
                 