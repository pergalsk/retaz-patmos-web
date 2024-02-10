import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPresidentComponent } from './svg-president.component';

describe('SvgPresidentComponent', () => {
  let component: SvgPresidentComponent;
  let fixture: ComponentFixture<SvgPresidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SvgPresidentComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
