import { WORKSPACE_DATA, WorkspaceTabRef } from 'ngs-workspace';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  lastName: string = '';

  constructor(
    @Inject(WORKSPACE_DATA) public data: { name: string; },
    private ref: WorkspaceTabRef<TabComponent>
  ) { }

  ngOnInit(): void {
  }

}
