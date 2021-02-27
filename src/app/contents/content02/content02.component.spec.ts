import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content02Component } from './content02.component';

describe('Content02Component', () => {
  let component: Content02Component;
  let fixture: ComponentFixture<Content02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Content02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
