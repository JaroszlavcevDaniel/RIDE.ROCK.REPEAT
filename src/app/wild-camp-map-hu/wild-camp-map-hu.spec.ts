import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildCampMapHu } from './wild-camp-map-hu';

describe('WildCampMapHu', () => {
  let component: WildCampMapHu;
  let fixture: ComponentFixture<WildCampMapHu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WildCampMapHu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WildCampMapHu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
