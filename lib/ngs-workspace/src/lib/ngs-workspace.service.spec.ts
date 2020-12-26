import { TestBed } from '@angular/core/testing';

import { NgsWorkspaceService } from './ngs-workspace.service';

describe('NgsWorkspaceService', () => {
  let service: NgsWorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgsWorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
