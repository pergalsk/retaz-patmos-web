import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoSplitComponent } from './two-split.component';

describe('TwoSplitComponent', () => {
  let component: TwoSplitComponent;
  let fixture: ComponentFixture<TwoSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TwoSplitComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
