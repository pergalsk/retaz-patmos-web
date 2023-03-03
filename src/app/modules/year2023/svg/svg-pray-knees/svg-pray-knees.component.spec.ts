import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPrayKneesComponent } from './svg-pray-knees.component';

describe('SvgPrayKneesComponent', () => {
  let component: SvgPrayKneesComponent;
  let fixture: ComponentFixture<SvgPrayKneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgPrayKneesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPrayKneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
