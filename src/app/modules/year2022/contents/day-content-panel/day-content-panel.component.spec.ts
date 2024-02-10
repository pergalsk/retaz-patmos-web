import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayContentPanelComponent } from './day-content-panel.component';

describe('DayContentPanelComponent', () => {
  let component: DayContentPanelComponent;
  let fixture: ComponentFixture<DayContentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DayContentPanelComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayContentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
