import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content07Component } from './content07.component';

describe('Content07Component', () => {
  let component: Content07Component;
  let fixture: ComponentFixture<Content07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [Content07Component],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
