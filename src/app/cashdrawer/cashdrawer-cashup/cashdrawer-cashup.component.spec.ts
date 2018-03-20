import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashdrawerCashupComponent } from './cashdrawer-cashup.component';

describe('CashdrawerCashupComponent', () => {
  let component: CashdrawerCashupComponent;
  let fixture: ComponentFixture<CashdrawerCashupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashdrawerCashupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashdrawerCashupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
