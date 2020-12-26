import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgsWorkspaceComponent } from './ngs-workspace.component';

describe('NgsWorkspaceComponent', () => {
  let component: NgsWorkspaceComponent;
  let fixture: ComponentFixture<NgsWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgsWorkspaceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgsWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
