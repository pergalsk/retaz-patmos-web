import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCalendarManComponent } from './svg-calendar-man.component';

describe('SvgCalendarManComponent', () => {
  let component: SvgCalendarManComponent;
  let fixture: ComponentFixture<SvgCalendarManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgCalendarManComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgCalendarManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
