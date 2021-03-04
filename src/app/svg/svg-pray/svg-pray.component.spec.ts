import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPrayComponent } from './svg-pray.component';

describe('SvgPrayComponent', () => {
  let component: SvgPrayComponent;
  let fixture: ComponentFixture<SvgPrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgPrayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
