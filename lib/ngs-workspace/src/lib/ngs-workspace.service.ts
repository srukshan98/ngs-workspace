import { ComponentType } from '@angular/cdk/portal';
import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceDefaultConfig } from './config/default.config';
import { IWorkspaceTabConfig } from './models/i-workspace-tab-config';
import { WORKSPACE_DATA } from './models/workspace-data.token';
import { WorkspaceRef } from './models/workspace-ref.model';
import { WorkspaceTabRef } from './models/workspace-tab-ref.model';

@Injectable({
  providedIn: 'root'
})
export class NgsWorkspace {
  constructor(
    private defaults: WorkspaceDefaultConfig,
    private cfr: ComponentFactoryResolver,
  ) {
  }
  slide: BehaviorSubject<'in' | 'out'> = new BehaviorSubject<'in' | 'out'>('in');
  referenceSubject: BehaviorSubject<WorkspaceRef<any, any, any>> = new BehaviorSubject(null);
  open<T, D, R>(template: ComponentType<T>, config?: IWorkspaceTabConfig<D>): WorkspaceTabRef<T, R> {
    const workspaceRef: WorkspaceRef<T, D, R> = new WorkspaceRef<T, D, R>(
      template,
      { ...this.defaults.config, ...config }
    );
    workspaceRef.minimize = () => this.slide.next('in');

    workspaceRef.componentRef = this.getComponentReference<T, D, R>(workspaceRef);

    this.referenceSubject.next(workspaceRef);
    return workspaceRef;
  }

  private getComponentReference<T, D, R>(workspaceRef: WorkspaceRef<T, D, R>) {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: WorkspaceTabRef,
          useValue: workspaceRef
        },
        {
          provide: WORKSPACE_DATA,
          useValue: workspaceRef.config.data
        }
      ]
    });
    const factory: ComponentFactory<any> = this.cfr.resolveComponentFactory(workspaceRef.component);

    return factory.create(injector);
  }
}
