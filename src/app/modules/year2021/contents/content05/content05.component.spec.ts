import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content05Component } from './content05.component';

describe('Content05Component', () => {
  let component: Content05Component;
  let fixture: ComponentFixture<Content05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Content05Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
