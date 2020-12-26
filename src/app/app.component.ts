import { TabComponent } from './tab/tab.component';
import { NgsWorkspaceService } from 'ngs-workspace';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private workspaceService: NgsWorkspaceService
  ) { }

  toggleWorkspace(): void {
    if (this.workspaceService.slide.getValue() === 'in') {
      this.workspaceService.slide.next('out');
    } else {
      this.workspaceService.slide.next('in');
    }
  }

  openTab(): void {
    this.workspaceService.open(TabComponent, {
      title: 'New Tab ($$)',
    });
  }
}
