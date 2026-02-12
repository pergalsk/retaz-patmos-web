import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContent2026Component } from './main-content2026.component';

describe('MainContent2026Component', () => {
  let component: MainContent2026Component;
  let fixture: ComponentFixture<MainContent2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContent2026Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContent2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
