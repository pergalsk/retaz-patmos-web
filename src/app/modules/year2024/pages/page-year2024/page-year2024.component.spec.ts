import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageYear2024Component } from './page-year2024.component';

describe('PageYear2024Component', () => {
  let component: PageYear2024Component;
  let fixture: ComponentFixture<PageYear2024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageYear2024Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageYear2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
