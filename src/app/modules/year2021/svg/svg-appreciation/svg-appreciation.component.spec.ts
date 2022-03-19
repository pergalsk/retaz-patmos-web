import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAppreciationComponent } from './svg-appreciation.component';

describe('SvgAppreciationComponent', () => {
  let component: SvgAppreciationComponent;
  let fixture: ComponentFixture<SvgAppreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgAppreciationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgAppreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
