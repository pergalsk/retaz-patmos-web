import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content03Component } from './content03.component';

describe('Content03Component', () => {
  let component: Content03Component;
  let fixture: ComponentFixture<Content03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [Content03Component],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
