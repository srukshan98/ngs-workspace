import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTabComponent } from './no-tab.component';

describe('NoTabComponent', () => {
  let component: NoTabComponent;
  let fixture: ComponentFixture<NoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
