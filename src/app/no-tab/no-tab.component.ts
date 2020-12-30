import { Component, OnInit } from '@angular/core';
import { NgsWorkspace } from 'ngs-workspace';
import { TabComponent } from '../tab/tab.component';

@Component({
	selector: 'app-no-tab',
	templateUrl: './no-tab.component.html',
	styleUrls: ['./no-tab.component.scss']
})
export class NoTabComponent implements OnInit {

	constructor(
		private workspaceService: NgsWorkspace
	) { }

	ngOnInit(): void {
	}

	openTab(count = true): void {
		const ref = this.workspaceService.open(TabComponent, {
			title: 'New Tab' + (count ? ' ($$)' : ''),
		});
		ref.onClose().subscribe((r) => {
			console.log(r);
		});
	}

}
