import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgTimeComponent } from './svg-time.component';

describe('SvgTimeComponent', () => {
  let component: SvgTimeComponent;
  let fixture: ComponentFixture<SvgTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
