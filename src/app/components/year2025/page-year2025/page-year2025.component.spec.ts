import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageYear2025Component } from './page-year2025.component';

describe('PageYear2025Component', () => {
  let component: PageYear2025Component;
  let fixture: ComponentFixture<PageYear2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageYear2025Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageYear2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
