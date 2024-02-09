import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgHandsSoilComponent } from './svg-hands-soil.component';

describe('SvgHandsSoilComponent', () => {
  let component: SvgHandsSoilComponent;
  let fixture: ComponentFixture<SvgHandsSoilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgHandsSoilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgHandsSoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
