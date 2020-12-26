import { CdkDragRelease } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  HostBinding,
  Injector,
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
import { WORKSPACE_DATA } from './models/workspace-data.token';
import { WorkspaceErrorTypes } from './models/workspace-error.types';
import { WorkspaceRef } from './models/workspace-ref.model';
import { WorkspaceTabRef } from './models/workspace-tab-ref.model';
import { NgsWorkspaceService } from './ngs-workspace.service';

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
export class NgsWorkspaceComponent implements AfterViewInit {
  @HostBinding('style.width')
  width: string = String(this.defaults.config.width);
  @HostBinding('@slideInOut')
  get getSlideInOut(): string {
    return this.workspaceService.slide.getValue();
  }

  @ViewChildren('workspaceContainer', {
    read: ViewContainerRef
  })
  containers: QueryList<ViewContainerRef>;
  references: WorkspaceRef<any, any, any>[] = [];
  selectedTabIndex = -1;
  config: WorkspaceConfig<any> = this.defaults.config;
  constructor(
    private workspaceService: NgsWorkspaceService,
    private defaults: WorkspaceDefaultConfig,
    private cfr: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    @Optional() private router: Router
  ) { }

  ngAfterViewInit(): void {
    if (this.config.minimizeOnNavigation && this.router) {
      this.router.events.subscribe((e: Event) => {
        if (
          e instanceof NavigationStart &&
          this.workspaceService.slide.value === 'out'
        ) {
          this.minimize();
        }
      });
    }
    this.workspaceService.referenceSubject.subscribe((reference: WorkspaceRef<any, any, any>) => {
      if (reference == null) { return; }
      try {
        if (this.references.length === 0) {
          this.references.push(null);
        }
        if (this.references.some(v => v && v.config.title === reference.config.title)) {
          this.delayedClose(reference, {
            error: WorkspaceErrorTypes.Warning,
            message: 'Similar workspace detected'
          });
          return;
        }
        this.references.push(reference);
        const index: number = this.references.length - 1;
        if (this.references[index - 1] == null) {
          this.selectedTabIndex = index - 1;
        }
        this.cdr.detectChanges();
        reference.close = (data?: any) => this.onClose(reference, data);
        const container: ViewContainerRef = this.containers.toArray()[index];
        const injector: Injector = Injector.create({
          providers: [
            {
              provide: WorkspaceTabRef,
              useValue: reference
            },
            {
              provide: WORKSPACE_DATA,
              useValue: reference.config.data
            }
          ]
        });
        const factory: ComponentFactory<any> = this.cfr.resolveComponentFactory(reference.component);
        const cr: ComponentRef<any> = container.createComponent(factory, 0, injector);
        this.selectedTabIndex = index;
        if (this.references[index - 1] == null) {
          this.references.shift();
        }
        reference.componentRef = cr;
        this.workspaceService.slide.next('out');
        reference.OpenChanges.next();
        reference.TabVisitChanges.next(cr.instance);
      }
      catch (e) {
        this.delayedClose(reference, e);
      }
    });
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

  onClose(ref: WorkspaceRef<any, any, any>, data?: any): void {
    const index: number = this.references.findIndex((v: WorkspaceRef<any, any, any>) => v === ref);
    if (index !== -1) {
      this.references.splice(index, 1);
    }
    if (ref.componentRef) {
      ref.componentRef.destroy();
    }
    ref.TabVisitChanges.complete();
    ref.TabLeaveChanges.complete();
    ref.OpenChanges.complete();
    ref.CloseChanges.next(data);
    ref.CloseChanges.complete();
    if (this.references.length === 0) {
      this.minimize();
      ref.resetAll();
    }
  }

  onDrag({ pointerPosition: { x } }: { pointerPosition: { x: number; }; }): void {
    if (x !== 0) {
      const width: number = window.innerWidth - x;

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
}

function getPxFromVw(value: string): number {
  value = value.replace('vw', '');
  const valueNum: number = parseFloat(value);
  return (document.documentElement.clientWidth / 100) * valueNum;
}
