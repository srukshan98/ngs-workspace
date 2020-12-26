import { ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable, TemplateRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { WorkspaceConfig } from './workspace-config.model';
import { WorkspaceTabRef } from './workspace-tab-ref.model';

export class WorkspaceRef<T, D, R> extends WorkspaceTabRef<T, R> {
  private static currentReferenceNumber: number = 0;
  componentRef: ComponentRef<T>;
  get instance(): T {
    if (this.componentRef) {
      return this.componentRef.instance;
    }
    return null;
  }
  TabVisitChanges: Subject<T> = new Subject<T>();
  TabLeaveChanges: Subject<void> = new Subject<void>();
  CloseChanges: Subject<R | undefined> = new Subject<R | undefined>();
  OpenChanges: Subject<void> = new Subject<void>();

  constructor(public component: ComponentType<T>, public config: WorkspaceConfig<D>) {
    super();
    this.referenceId = ++WorkspaceRef.currentReferenceNumber;
    this.checkTitle();
  }
  private checkTitle(): void {
    if (this.config.title.includes('$$')) {
      this.config.title = this.config.title.replace('$$', `${this.referenceId}`);
    }
  }
  onTabVisit(): Observable<T> {
    return this.TabVisitChanges.asObservable();
  }
  onTabLeave(): Observable<void> {
    return this.TabLeaveChanges.asObservable();
  }
  onClose(): Observable<R | undefined> {
    return this.CloseChanges.asObservable();
  }
  onOpen(): Observable<void> {
    return this.OpenChanges.asObservable();
  }
  minimize(): void { }
  close(data?: R): void { }
  selectTab(): void { }
  resetAll(): void {
    WorkspaceRef.currentReferenceNumber = 0;
  }
}
