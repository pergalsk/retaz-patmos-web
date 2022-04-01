import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkraineContent2022Component } from './ukraine-content2022.component';

describe('UkraineContent2022Component', () => {
  let component: UkraineContent2022Component;
  let fixture: ComponentFixture<UkraineContent2022Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkraineContent2022Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UkraineContent2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
