import { NgsWorkspace } from './../ngs-workspace.service';
import { Directive, TemplateRef, OnInit, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[ngsWorkspaceHeader]'
})
export class WorkspaceHeaderDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private workspace: NgsWorkspace,
  ) {}

  ngOnInit(): void {
    this.workspace.attachHeader(this.templateRef);
  }
}
