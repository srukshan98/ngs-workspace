import { TabComponent } from './tab/tab.component';
import { NgsWorkspace, WorkspaceErrorModel } from 'ngs-workspace';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private workspace: NgsWorkspace,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.workspace.emitErrors.subscribe((err: WorkspaceErrorModel) => {
      if (err.message) {
        this.snackBar.open(err.message);
      }
    });
  }

  toggleWorkspace(): void {
    if (this.workspace.slide.getValue() === 'in') {
      this.workspace.slide.next('out');
    } else {
      this.workspace.slide.next('in');
    }
  }

  openTab(count = true): void {
    const ref = this.workspace.open(TabComponent, {
      title: 'New Tab' + (count ? ' ($$)' : ''),
      data: {
        name: 'Harrison'
      },
    });
    ref.componentRef.instance.lastName = 'Wells';
    ref.onClose().subscribe((r) => {
      console.log(r);
    });
  }

  closeTabs(): void {
    this.workspace.closeAll();
  }
}
