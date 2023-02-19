import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContent2023Component } from './main-content2023.component';

describe('MainContent2023Component', () => {
  let component: MainContent2023Component;
  let fixture: ComponentFixture<MainContent2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContent2023Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContent2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
