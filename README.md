# <div align="center"> Angular Smart Workspace </div>

![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/srukshan98) [![GitHub issues](https://img.shields.io/github/issues/srukshan98/ngs-workspace)](https://github.com/srukshan98/ngs-workspace/issues) [![GitHub license](https://img.shields.io/github/license/srukshan98/ngs-workspace)](https://github.com/srukshan98/ngs-workspace)

This Library introduces an Intelligent way to hold your components dynamically in a tabular format in a modern side panel.

Below documentation is a 90& plagiarisation of Angular Mat Dialog documentation.

## Overview

The `NgsWorkspace` service can be used to open workspaces with Material Design styling and animations into a modern looking side panel.

![Sample Image](https://drive.google.com/uc?export=download&id=1kB_dhSB-bXnL5b0VMsVTUVdiOWCWrvT6)

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

The workspace component should be added to a top level component template. `eg. app.component.html`

```
<ngs-workspace></ngs-workspace>
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

## API

#### Coming Soon

## Collaboration

Please create a Github Issues to inform any issues and suggestions, also you can fix any code issues you find and create a pull request to integrate.
