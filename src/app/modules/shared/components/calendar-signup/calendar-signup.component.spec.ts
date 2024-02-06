import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSignupComponent } from './calendar-signup.component';

describe('CalendarSignupComponent', () => {
  let component: CalendarSignupComponent;
  let fixture: ComponentFixture<CalendarSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarSignupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
