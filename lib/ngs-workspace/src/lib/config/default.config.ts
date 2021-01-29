import { NoTabComponent } from './../no-tab/no-tab.component';
import { WorkspaceConfig } from '../models/workspace-config.model';
import { Inject, Injectable, Optional } from '@angular/core';
import { IWorkspaceConfig } from '../models/i-workspace.config';
import { CONFIG } from '../models/workspace-config.token';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceDefaultConfig {
  private static defaults: WorkspaceConfig<any> = {
    title: 'Untitled ($$)',
    disableClose: false,
    maxWidth: '90vw',
    minWidth: '40vw',
    minimizeOnNavigation: false,
    width: '70vw',
    maxTabCount: -1,
    placeholderComponent: NoTabComponent,
    direction: 'RTL',
    showSideBtn: true
  };

  get config(): WorkspaceConfig<any> {
    return { ...WorkspaceDefaultConfig.defaults };
  }

  constructor(
    @Optional() @Inject(CONFIG) config: IWorkspaceConfig,
  ) {
    if (config) {
      WorkspaceDefaultConfig.defaults = { ...WorkspaceDefaultConfig.defaults, ...config };
    }
  }
}
