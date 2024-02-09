import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContent2024Component } from './main-content2024.component';

describe('MainContent2024Component', () => {
  let component: MainContent2024Component;
  let fixture: ComponentFixture<MainContent2024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContent2024Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContent2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
