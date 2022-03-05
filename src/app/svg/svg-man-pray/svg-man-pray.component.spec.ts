import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgManPrayComponent } from './svg-man-pray.component';

describe('SvgManPrayComponent', () => {
  let component: SvgManPrayComponent;
  let fixture: ComponentFixture<SvgManPrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgManPrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgManPrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
