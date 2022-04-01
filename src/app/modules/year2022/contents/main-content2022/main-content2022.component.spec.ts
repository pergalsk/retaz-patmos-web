import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContent2022Component } from './main-content2022.component';

describe('MainContent2022Component', () => {
  let component: MainContent2022Component;
  let fixture: ComponentFixture<MainContent2022Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContent2022Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContent2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
