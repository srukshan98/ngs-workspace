# <div align="center"> Angular Smart Workspace </div>

![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/srukshan98) [![GitHub issues](https://img.shields.io/github/issues/srukshan98/ngs-workspace)](https://github.com/srukshan98/ngs-workspace/issues) [![GitHub license](https://img.shields.io/github/license/srukshan98/ngs-workspace)](https://github.com/srukshan98/ngs-workspace)

This Library introduces an Intelligent way to hold your components dynamically in a tabular format in a modern side panel.

Below documentation is a 90% plagiarisation of Angular Mat Dialog documentation.

# Overview

The `NgsWorkspace` service can be used to open workspaces with Material Design styling and animations into a modern looking side panel.

![Sample Image](https://drive.google.com/uc?export=download&id=1kB_dhSB-bXnL5b0VMsVTUVdiOWCWrvT6)

### [Demo Link](https://stackblitz.com/github/srukshan98/ngs-workspace-sample)

The `NgsWorkspaceModule` should be added to the app module with optional default configuration.

```
@NgModule({
  imports: [
    ...
    NgsWorkspaceModule.forRoot({
      placeholderComponent: NoTabComponent
    }),
    ...
  ],
})
export class AppModule { }
```

A workspace is opened by calling the open method with a component to be loaded and an optional config object. The open method will return an instance of NgsWorkspaceTabRef:

```
let workspaceRef = workspace.open(UserProfileComponent, {
  title: 'User Profile'
});
```

The NgsWorkspaceTabRef provides a handle on the opened workspace tab. It can be used to close the workspace tab and to receive notification when the workspace tab has been closed.

```
workspaceRef.afterClosed().subscribe(result => {
  console.log(`Workspace result: ${result}`); // Cool!
});

workspaceRef.close('Cool!');
```

Components created via NgsWorkspace can inject NgsWorkspaceTabRef and use it to close the workspace in which they are contained. When closing, an optional result value can be provided. This result value is forwarded as the result of the afterClosed promise.

```
@Component({/* ... */})
export class YourWorkspaceTab {
  constructor(public workspaceRef: NgsWorkspaceTabRef<YourWorkspaceTab>) { }

  closeWorkspaceTab() {
    this.workspaceRef.close('Cool!');
  }
}
```

### Sharing data with the Workspace Tab component.

If you want to share data with your workspace tab, you can use the data option to pass information to the workspace tab component.

```
let workspaceRef = workspace.open(YourWorkspaceTab, {
  data: { name: 'austin' },
});
```

To access the data in your workspace tab component, you have to use the `WORKSPACE_DATA` injection token:

```
import {Component, Inject} from '@angular/core';
import {WORKSPACE_DATA} from 'ngs-workspace';

@Component({
  selector: 'your-workspace',
  template: 'passed in {{ data.name }}',
})
export class YourWorkspaceTab {
  constructor(@Inject(WORKSPACE_DATA) public data: {name: string}) { }
}
```

### Handling Errors Globally

```
this.workspace.emitErrors.subscribe((err: WorkspaceErrorModel) => {
  if (err.message) {
    this.snackBar.open(err.message);
  }
});
```

### Adding Custom header to workspace

Add this to any html template in your project

```
<div *ngsWorkspaceHeader class="header">
  Workspace
  <div class="close-btn" ngsWorkspaceClose>
    <mat-icon>login</mat-icon>
  </div>
</div>
```

or attach the template Reference or Component to workspace service to dynamically set the header

```
this.workspace.attachHeader(header);
```

# API reference

```
import {NgsWorkspaceModule} from 'ngs-workspace';
```

## Services
<hr>

## NgsWorkspace

Service to open NgsWorkspace Tab.
<br/><br/>
### Properties

| Name | Description |
|---|---|
| slide: BehaviorSubject<'in' \| 'out'> | Slide in and out the workspace |
| afterAllClosed: Observable<void> | Stream that emits when all open tabs have finished closing.|
| tabCount: Observable<number> | An Observable that will emit on Tab count changes |
| onTabClosed: Subject<WorkspaceTabRef<any>> | An observable which will emit if a tab is closed |
| afterOpened: Subject<WorkspaceTabRef<any>> | Stream that emits when a tab has been opened. |
| openWorkspaces: WorkspaceTabRef<any>[] | Keeps track of currently-open workspace tabs |
| emitErrors: Subject<WorkspaceErrorModel> | Stream that emits all tab errors |

<br/><br/>
### Methods
| closeAll |
|---|
| Close all of the currently-open tabs |
<br/>

| getWorkspaceById ||
|---|---|
| Finds an open tab by its id ||
| **Parameters** ||
| id<br>*number* | ID to use when looking up the tab|
| <b>Returns</b> ||
| WorkspaceTabRef\<T\> \| undefined ||

<br/>

| open ||
|---|---|
| Opens a workspace tab containing the given component ||
| **Parameters** ||
| component<br>*ComponentType\<T\>* | Type of the component to load into the tab |
| config?<br>*IWorkspaceTabConfig\<D\>* | Extra Configuration Options |
| <b>Returns</b> ||
| WorkspaceTabRef\<T, R\> ||

<br/>

| attachHeader ||
|---|---|
| Attach the given component or Template as the workspace header ||
| **Parameters** ||
| headerRef<br>*TemplateRef\<any\> \| ComponentType\<any\>* | Type of the component or Template to load as the header |
<br/>

## Directives
<hr>

## WorkspaceClose

Button that will close the current workspace tab

Selector: ```[ngsWorkspaceClose]```

<br/>

## WorkspaceHeader

A structural directive which will take it's content and add it to the workspace header.

Selector: ```[ngsWorkspaceHeader]```
<br><br>

## Classes
<hr>

## WorkspaceTabRef

Reference to a tab opened via NgsWorkspace Service.
<br><br>

### Properties

| Name | Description |
|---|---|
| referenceId: number ||
| componentRef: ComponentRef\<T\> | reference to component opened in tab |
<br><br>

### Methods
| close ||
|---|---|
| Close current workspace tab ||
| **Parameters** ||
| data<br>*R* | Data to passes down to parent component |
<br>

| minimize |
|---|
| Minimize the workspace |
<br>

| onTabVisit |
|---|
| Gets an observable that is notified when the tab is been visited |
| <b>Returns</b> |
| Observable\<T\> |
<br>

| onTabLeave |
|---|
| Gets an observable that is notified when the tab is been left |
| <b>Returns</b> |
| Observable\<void\> |
<br>

| onClose |
|---|
| Gets an observable that is notified when the tab is been closed |
| <b>Returns</b> |
| Observable\<R \| undefined\> |
<br>

| onOpen |
|---|
| Gets an observable that is notified when the tab is been opened |
| <b>Returns</b> |
| Observable\<void\> |

<br><br>

## Interfaces
<hr>

## IWorkspaceTabConfig

Configuration for opening a workspace tab with the NgsWorkspace service
<br><br>

### Properties

| Name | Description |
|---|---|
| title?: string | Title of the Workspace tab |
| data?: D \| null | Data being injected into the child component.|
| disableClose?: boolean | Whether the user can click on the tab close button to close the modal |

<br><br>

## WorkspaceErrorModel

Error Model Type the Workspace emits errors
<br><br>

### Properties

| Name | Description |
|---|---|
| ref: WorkspaceTabRef\<any\> | Reference the Workspace tab |
| errorV2: WorkspaceErrorTypesV2 | Error Type enum.|
| message?: string | The Error message for the error, if any. |
| content?: string | The Error content, if any. |

<br><br>

## Type aliases
<hr>

### WorkspaceErrorTypesV2
The enum type of error that is thrown.
```
enum WorkspaceErrorTypesV2 {
  SIMILAR_TAB_ERROR,
  MAX_TAB_COUNT_EXCEEDED_ERROR,
  CONSOLE_ERROR
}
```
<br><br>

## Constants
<hr>

### WORKSPACE_DATA
Injection token that can be used to access the data that was passed in to a tab.

```
const WORKSPACE_DATA: InjectionToken<string>
```

# Versions
### v0.2.0-beta-2

This Include breaking changes

- Updated Customizable classes api to contain Container, Body, TabLabel and TabContainer
- Exposed an external tab close handle
- Exposed tab count observable
### v0.2.0-beta

This Update include breaking changes and new features

- The requirement to add the workspace component to a base component is now removed
- The workspace component is not exposed
- The method to add the workspace header has been altered
- New API exposed from Workspace service to attach header dynamically
- Exposed a Configuration to attach a custom class to workspace container "workspaceContainerClass"

### v0.1.2

This Update include new features

- Added the ability to change the direction of the workspace(RTL or LTR)
- Added new Workspace header which can be added by a directive(ngsWorkspaceHeader)
- Added new Workspace Close directive(ngsWorkspaceClose)
- Added the ability to hide the side button

### v0.1.1

This Update include new feature and APIs

- Added New APIs to service
  - afterAllClosed
  - afterOpen
  - openWorkspaces
  - closeAll method
  - getWorkspaceById method
- Global Error Handling added

### v0.1.0

This update include several bug and performance enhancement.

- Added a Workspace Container CSS Class
- Now the component reference is exposed from WorkspaceTabRef
- Default Error Enum is Deprecated
- New Error Enum added with Better description

# Collaboration

Please create a Github Issues to inform any issues and suggestions, also you can fix any code issues you find and create a pull request to integrate.
