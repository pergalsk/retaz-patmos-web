import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDiaryComponent } from './svg-diary.component';

describe('SvgDiaryComponent', () => {
  let component: SvgDiaryComponent;
  let fixture: ComponentFixture<SvgDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgDiaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
