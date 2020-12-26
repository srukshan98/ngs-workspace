import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceDefaultConfig } from './config/default.config';
import { WorkspaceConfig } from './models/workspace-config.model';
import { IWorkspaceConfig } from './models/i-workspace.config';
import { CONFIG } from './models/workspace-config.token';
import { WorkspaceRef } from './models/workspace-ref.model';
import { WorkspaceTabRef } from './models/workspace-tab-ref.model';

@Injectable({
  providedIn: 'root'
})
export class NgsWorkspaceService {
  constructor(
    @Optional() @Inject(CONFIG) config: IWorkspaceConfig
  ) {
    if (config) {
      WorkspaceDefaultConfig.setDefaults(config);
    }
  }
  slide: BehaviorSubject<'in' | 'out'> = new BehaviorSubject<'in' | 'out'>('in');
  referenceSubject: BehaviorSubject<WorkspaceRef<any, any, any>> = new BehaviorSubject(null);
  open<T, D, R>(template: ComponentType<T>, config?: WorkspaceConfig<D>): WorkspaceTabRef<T, R> {
    const workspaceRef: WorkspaceRef<T, D, R> = new WorkspaceRef<T, D, R>(
      template,
      { ...WorkspaceDefaultConfig.config, ...config }
    );
    workspaceRef.minimize = () => this.slide.next('in');
    this.referenceSubject.next(workspaceRef);
    return workspaceRef;
  }
}
