import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContent2025Component } from './main-content2025.component';

describe('MainContent2025Component', () => {
  let component: MainContent2025Component;
  let fixture: ComponentFixture<MainContent2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContent2025Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainContent2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
