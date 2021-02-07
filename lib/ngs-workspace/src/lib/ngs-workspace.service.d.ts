import { ComponentRef, TemplateRef } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ComponentType } from '@angular/cdk/portal';
import { WorkspaceTabRef } from './models/workspace-tab-ref.model';
import { IWorkspaceTabConfig } from './models/i-workspace-tab-config';
import { WorkspaceErrorModel } from './models/workspace-error.model';
import { NgsWorkspaceComponent } from './ngs-workspace.component';

export abstract class NgsWorkspace {
  slide: BehaviorSubject<'in' | 'out'>;
  afterAllClosed: Observable<void>;
  tabCount: Observable<number>;
  onTabClosed: Subject<WorkspaceTabRef<any>>;
  afterOpened: Subject<WorkspaceTabRef<any>>;
  openWorkspaces: WorkspaceTabRef<any>[];
  emitErrors: Subject<WorkspaceErrorModel>;

  abstract open<T, D, R>(template: ComponentType<T>, config?: IWorkspaceTabConfig<D>): WorkspaceTabRef<T, R>;
  abstract closeAll(): void;
  abstract getWorkspaceById<T>(id: number): WorkspaceTabRef<T> | undefined;
  abstract attachHeader(headerRef: TemplateRef<any> | ComponentType<any>);
}
