import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content04Component } from './content04.component';

describe('Content04Component', () => {
  let component: Content04Component;
  let fixture: ComponentFixture<Content04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content04Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
