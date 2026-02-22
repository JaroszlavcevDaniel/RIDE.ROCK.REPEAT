import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildCampMapEn } from './wild-camp-map-en';

describe('WildCampMapEn', () => {
  let component: WildCampMapEn;
  let fixture: ComponentFixture<WildCampMapEn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WildCampMapEn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WildCampMapEn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
