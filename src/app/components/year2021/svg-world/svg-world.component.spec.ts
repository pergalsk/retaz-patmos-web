import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgWorldComponent } from './svg-world.component';

describe('SvgWorldComponent', () => {
  let component: SvgWorldComponent;
  let fixture: ComponentFixture<SvgWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgWorldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
