import { WorkspaceDefaultConfig } from './config/default.config';
import { NoTabComponent } from './no-tab/no-tab.component';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgsWorkspaceComponent } from './ngs-workspace.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IWorkspaceConfig } from './models/i-workspace.config';
import { CONFIG } from './models/workspace-config.token';


@NgModule({
  declarations: [
    NgsWorkspaceComponent,
    NoTabComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    DragDropModule,
    MatButtonModule
  ],
  exports: [NgsWorkspaceComponent]
})
export class NgsWorkspaceModule {
  constructor(@Optional() @SkipSelf() parentModule?: NgsWorkspaceModule) {
    if (parentModule) {
      throw new Error(
        'NgsWorkspaceModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: IWorkspaceConfig): ModuleWithProviders<NgsWorkspaceModule> {
    return {
      ngModule: NgsWorkspaceModule,
      providers: [
        WorkspaceDefaultConfig,
        { provide: CONFIG, useValue: config }
      ]
    };
  }
}