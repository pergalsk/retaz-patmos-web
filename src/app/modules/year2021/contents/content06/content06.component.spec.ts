import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content06Component } from './content06.component';

describe('Content06Component', () => {
  let component: Content06Component;
  let fixture: ComponentFixture<Content06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Content06Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
