import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content01Component } from './content01.component';

describe('Content01Component', () => {
  let component: Content01Component;
  let fixture: ComponentFixture<Content01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content01Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
