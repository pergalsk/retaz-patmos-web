import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeStripComponent } from './badge-strip.component';

describe('BadgeStripComponent', () => {
  let component: BadgeStripComponent;
  let fixture: ComponentFixture<BadgeStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BadgeStripComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
