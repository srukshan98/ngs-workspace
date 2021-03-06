import { NgsWorkspaceComponent } from './ngs-workspace.component';
import { ComponentPortal, ComponentType, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WorkspaceDefaultConfig } from './config/default.config';
import { IWorkspaceTabConfig } from './models/i-workspace-tab-config';
import { WORKSPACE_DATA } from './models/workspace-data.token';
import { WorkspaceErrorModel } from './models/workspace-error.model';
import { WorkspaceRef } from './models/workspace-ref.model';
import { WorkspaceTabRef } from './models/workspace-tab-ref.model';

@Injectable({
  providedIn: 'root'
})
export class NgsWorkspace {
  slide: BehaviorSubject<'in' | 'out'> = new BehaviorSubject<'in' | 'out'>('in');
  referenceSubject: BehaviorSubject<WorkspaceRef<any, any, any>> = new BehaviorSubject(null);
  afterAllClosedSubject: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  afterAllClosed: Observable<void> = this.afterAllClosedSubject.asObservable();
  tabCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  tabCount: Observable<number> = this.tabCountSubject.asObservable();
  onTabClosed: Subject<WorkspaceTabRef<any>> = new Subject<WorkspaceTabRef<any>>();
  afterOpened: Subject<WorkspaceTabRef<any>> = new Subject<WorkspaceTabRef<any>>();
  openWorkspaces: WorkspaceTabRef<any>[] = [];
  emitErrors: Subject<WorkspaceErrorModel> = new Subject<WorkspaceErrorModel>();
  workspaceRef: ComponentRef<NgsWorkspaceComponent>;
  private headerSubject: BehaviorSubject<Portal<any>> = new BehaviorSubject<Portal<any>>(null);
  header: Observable<Portal<any>> = this.headerSubject.asObservable();
  constructor(
    private defaults: WorkspaceDefaultConfig,
    private cfr: ComponentFactoryResolver
  ) {
  }
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

  closeAll(): void {
    this.openWorkspaces.forEach((workspace: WorkspaceTabRef<any>) => workspace.close());
  }

  getWorkspaceById<T>(id: number): WorkspaceTabRef<T> | undefined {
    return this.openWorkspaces.find((workspace: WorkspaceTabRef<any>) => workspace.referenceId === id);
  }

  attachHeader(headerRef: TemplateRef<any> | ComponentType<any>) {
    let portal: Portal<any>;
    if (headerRef instanceof TemplateRef) {
      portal = new TemplatePortal(headerRef, null);
    } else {
      portal = new ComponentPortal(headerRef);
    }
    this.headerSubject.next(portal);
  }
}
