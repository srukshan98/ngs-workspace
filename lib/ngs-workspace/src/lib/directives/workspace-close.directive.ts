import { NgsWorkspace } from './../ngs-workspace.service';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ngsWorkspaceClose]'
})
export class WorkspaceCloseDirective {
  constructor(
    private workspace: NgsWorkspace
  ) { }
  @HostListener('click') onClick() {
    this.workspace.slide.next('in');
  }
}
