import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, RendererFactory2 } from '@angular/core';
import { NgsWorkspaceComponent } from './ngs-workspace.component';

@Injectable({
  providedIn: 'root'
})
export class NgsWorkspaceInitializerService {

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private rendererFactory: RendererFactory2
  ) {
  }

  public appendWorkspaceToBody(): void {
    const workspaceRef = this.cfr.resolveComponentFactory(NgsWorkspaceComponent).create(this.injector);

    this.injector.get(ApplicationRef).attachView(workspaceRef.hostView);

    const domElem: HTMLElement = (workspaceRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.rendererFactory.createRenderer(null, null).appendChild(document.body, domElem);
  }
}
