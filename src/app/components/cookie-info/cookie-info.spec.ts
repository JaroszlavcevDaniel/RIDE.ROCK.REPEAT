import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieInfo } from './cookie-info';

describe('CookieInfo', () => {
  let component: CookieInfo;
  let fixture: ComponentFixture<CookieInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookieInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookieInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
