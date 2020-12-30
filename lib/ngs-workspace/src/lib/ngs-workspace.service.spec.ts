import { TestBed } from '@angular/core/testing';

import { NgsWorkspace } from './ngs-workspace.service';

describe('NgsWorkspaceService', () => {
	let service: NgsWorkspace;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(NgsWorkspace);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
