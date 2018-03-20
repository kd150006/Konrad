import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashdrawerListComponent } from './cashdrawer-list.component';

describe('CashdrawerListComponent', () => {
  let component: CashdrawerListComponent;
  let fixture: ComponentFixture<CashdrawerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashdrawerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashdrawerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
