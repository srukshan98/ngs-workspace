import { TabComponent } from './tab/tab.component';
import { NgsWorkspace } from 'ngs-workspace';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private workspace: NgsWorkspace
  ) { }

  ngOnInit(): void {
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
}
