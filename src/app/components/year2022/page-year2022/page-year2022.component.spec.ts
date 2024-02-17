import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageYear2022Component } from './page-year2022.component';

describe('PageYear2022Component', () => {
  let component: PageYear2022Component;
  let fixture: ComponentFixture<PageYear2022Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageYear2022Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageYear2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
