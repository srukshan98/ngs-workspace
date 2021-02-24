import { WorkspaceErrorModel } from './models/workspace-error.model';
import { CdkDragRelease } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  Optional,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Event, NavigationStart, Router } from '@angular/router';
import { slideInOutAnimation } from './animations/slide-in-out.animation';
import { WorkspaceDefaultConfig } from './config/default.config';
import { WorkspaceConfig } from './models/workspace-config.model';
import { WorkspaceErrorTypes, WorkspaceErrorTypesV2 } from './models/workspace-error.types';
import { WorkspaceRef } from './models/workspace-ref.model';
import { NgsWorkspace } from './ngs-workspace.service';
import { Portal } from '@angular/cdk/portal';
import { StyleType } from './config/style.type';

@Component({
  selector: 'ngs-workspace',
  templateUrl: './ngs-workspace.component.html',
  styleUrls: [
    './ngs-workspace.component.scss',
    './styles/bootstrap/bootstrap.scss'
  ],
  animations: [
    slideInOutAnimation
  ]
})
export class NgsWorkspaceComponent implements OnInit, AfterViewInit {
  @HostBinding('style.width')
  width: string = String(this.defaults.config.width);
  config: WorkspaceConfig<any> = this.defaults.config;
  header: Portal<any> = null;
  @HostBinding('@slideInOut')
  get getSlideInOut(): any {
    const value = this.config.direction === 'RTL' ? this.workspaceService.slide.getValue() : (
      this.workspaceService.slide.getValue() === 'in' ? 'in-rev' : 'out'
    );
    return {
      value,
      params: this.getAnimationParams()
    };
  }
  @HostBinding('style.left') leftStyle = this.config.direction === 'RTL' ? 'auto' : '0';
  @HostBinding('style.right') rightStyle = this.config.direction === 'LTR' ? 'auto' : '0';

  @ViewChildren('workspaceContainer', {
    read: ViewContainerRef
  })
  containers: QueryList<ViewContainerRef>;
  references: WorkspaceRef<any, any, any>[] = [];
  selectedTabIndex = -1;
  classes: StyleType;

  constructor(
    private defaults: WorkspaceDefaultConfig,
    private cdr: ChangeDetectorRef,
    private workspaceService: NgsWorkspace,
    @Optional() private router: Router
  ) { }

  ngOnInit(): void {
    this.setClasses();
    this.workspaceService.header.subscribe((p: Portal<any>) => {
      this.header = p;
      this.cdr.detectChanges();
    });
  }

  private setClasses() {
    this.classes = this.config.classes ?? {};

    this.classes.container = this.classes.container ?? [];
    this.classes.body = this.classes.body ?? [];
    this.classes.tabLabel = this.classes.tabLabel ?? [];
    this.classes.tabContainer = this.classes.tabContainer ?? [];

    this.classes.container.unshift('content');
    this.classes.tabLabel.unshift('header-tab-body');
    this.classes.tabContainer.unshift('workspace-container');
  }

  ngAfterViewInit(): void {
    this.checkNavigationChanges();
    this.workspaceService.referenceSubject.subscribe((reference: WorkspaceRef<any, any, any>) => {
      if (reference == null) { return; }
      try {
        if (!this.isValidReference(reference)) { return; }

        this.references.push(reference);
        const index: number = this.references.length - 1;
        reference.close = (data?: any) => this.onClose(reference, data);

        this.cdr.detectChanges();
        this.selectedTabIndex = index;

        const container: ViewContainerRef = this.containers.toArray()[index];
        container.insert(reference.componentRef.hostView);

        this.workspaceService.openWorkspaces = [...this.references];
        this.workspaceService.slide.next('out');
        reference.OpenChanges.next();
        reference.TabVisitChanges.next(reference.componentRef.instance);
        this.workspaceService.afterOpened.next(reference);
        this.workspaceService.tabCountSubject.next(this.references.length);
      }
      catch (e) {
        const err = {
          error: WorkspaceErrorTypes.Error,
          errorV2: WorkspaceErrorTypesV2.CONSOLE_ERROR,
          content: e
        };
        this.workspaceService.emitErrors.next({
          ref: reference,
          ...err
        });
        this.delayedClose(reference, err);
      }
    });
  }
  private checkNavigationChanges() {
    if (this.config.minimizeOnNavigation && this.router) {
      this.router.events.subscribe((e: Event) => {
        if (e instanceof NavigationStart &&
          this.workspaceService.slide.value === 'out') {
          this.minimize();
        }
      });
    }
  }

  isValidReference(reference: WorkspaceRef<any, any, any>) {
    if (this.references.some(v => v && v.config.title === reference.config.title)) {
      const err = {
        error: WorkspaceErrorTypes.Error,
        errorV2: WorkspaceErrorTypesV2.SIMILAR_TAB_ERROR,
        message: 'Similar workspace detected'
      };
      this.workspaceService.emitErrors.next({
        ref: reference,
        ...err
      });
      this.delayedClose(reference, err);
      return false;
    }
    if (this.config.maxTabCount !== -1) {
      if (this.config.maxTabCount <= this.references.length) {
        const err = {
          error: WorkspaceErrorTypes.Error,
          errorV2: WorkspaceErrorTypesV2.MAX_TAB_COUNT_EXCEEDED_ERROR,
          message: 'Maximum Tab Count Exceeded'
        };
        this.workspaceService.emitErrors.next({
          ref: reference,
          ...err
        });
        this.delayedClose(reference, err);
        return false;
      }
    }
    return true;
  }

  private delayedClose(reference: WorkspaceRef<any, any, any>, e: any) {
    setTimeout(() => this.onClose(reference, e), 10);
  }

  tabChange(event: MatTabChangeEvent): void {
    const i: number = event.index;
    if (this.selectedTabIndex === i || i === -1) { return; }
    if (this.references.length < this.selectedTabIndex) {
      this.references[this.selectedTabIndex].TabLeaveChanges.next();
    }
    this.references[i].TabVisitChanges.next(this.references[i].componentRef.instance);
    this.selectedTabIndex = i;
  }

  minimize(): void {
    this.workspaceService.slide.next('in');
  }

  onTabClose(ref: WorkspaceRef<any, any, any>): void {
    this.workspaceService.onTabClosed.next(ref);
    if (this.config.handleTabClose) {
      ref.close();
    }
  }

  onClose(ref: WorkspaceRef<any, any, any>, data?: any): void {
    const index: number = this.references.findIndex((v: WorkspaceRef<any, any, any>) => v === ref);
    if (index !== -1) {
      this.references.splice(index, 1);
    }
    this.workspaceService.openWorkspaces = [...this.references];
    if (ref.componentRef) {
      ref.componentRef.destroy();
    }
    ref.TabVisitChanges.complete();
    ref.TabLeaveChanges.complete();
    ref.OpenChanges.complete();
    ref.CloseChanges.next(data);
    ref.CloseChanges.complete();
    this.workspaceService.tabCountSubject.next(this.references.length);
    if (this.references.length === 0) {
      this.minimize();
      ref.resetAll();
      this.workspaceService.afterAllClosedSubject.next();
    }
  }

  onDrag({ pointerPosition: { x } }: { pointerPosition: { x: number; }; }): void {
    if (x !== 0) {
      const width: number = this.config.direction === 'RTL' ? window.innerWidth - x : x;

      if (this.canWidthChange(width)) {
        this.width = `${width}px`;
      }
    }
  }
  canWidthChange(width: number): boolean {

    if (
      (typeof this.config.maxWidth === 'number' || this.config.maxWidth.includes('vw')) &&
      (typeof this.config.minWidth === 'number' || this.config.minWidth.includes('vw'))
    ) {
      const minWidth: number = typeof this.config.minWidth === 'number' ? this.config.minWidth : getPxFromVw(this.config.minWidth);
      const maxWidth: number = typeof this.config.maxWidth === 'number' ? this.config.maxWidth : getPxFromVw(this.config.maxWidth);
      if (minWidth < width && width < maxWidth) {
        return true;
      }
    }
    return false;
  }

  dragStop(event: CdkDragRelease): void {
    event.source.element.nativeElement.style.removeProperty('transform');
  }

  private getAnimationParams(): any {
    return {
      duration: this.config.animationDuration,
      inOutTiming: this.config.animationTiming,
    };
  }
}

function getPxFromVw(value: string): number {
  value = value.replace('vw', '');
  const valueNum: number = parseFloat(value);
  return (document.documentElement.clientWidth / 100) * valueNum;
}
