import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgNatureComponent } from './svg-nature.component';

describe('SvgNatureComponent', () => {
  let component: SvgNatureComponent;
  let fixture: ComponentFixture<SvgNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SvgNatureComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
