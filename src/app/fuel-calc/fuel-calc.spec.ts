import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCalc } from './fuel-calc';

describe('FuelCalc', () => {
  let component: FuelCalc;
  let fixture: ComponentFixture<FuelCalc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuelCalc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelCalc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
