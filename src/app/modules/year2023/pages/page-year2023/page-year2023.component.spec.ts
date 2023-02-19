import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageYear2023Component } from './page-year2023.component';

describe('PageYear2023Component', () => {
  let component: PageYear2023Component;
  let fixture: ComponentFixture<PageYear2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageYear2023Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageYear2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
