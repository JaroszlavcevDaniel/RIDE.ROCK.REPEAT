import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupStories } from './popup-stories';

describe('PopupStories', () => {
  let component: PopupStories;
  let fixture: ComponentFixture<PopupStories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupStories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupStories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
