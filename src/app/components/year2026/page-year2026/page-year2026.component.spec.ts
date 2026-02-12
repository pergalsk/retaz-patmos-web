import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageYear2026Component } from './page-year2026.component';

describe('PageYear2026Component', () => {
  let component: PageYear2026Component;
  let fixture: ComponentFixture<PageYear2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageYear2026Component],
    }).compileComponents();

    fixture = TestBed.createComponent(PageYear2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
