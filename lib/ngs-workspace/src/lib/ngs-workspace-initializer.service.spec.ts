import { TestBed } from '@angular/core/testing';

import { NgsWorkspaceInitializerService } from './ngs-workspace-initializer.service';

describe('NgsWorkspaceInitializerService', () => {
  let service: NgsWorkspaceInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgsWorkspaceInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
