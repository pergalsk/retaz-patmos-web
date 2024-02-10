import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageYear2021Component } from './page-year2021.component';

describe('PageYear2021Component', () => {
  let component: PageYear2021Component;
  let fixture: ComponentFixture<PageYear2021Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PageYear2021Component],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageYear2021Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
