import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveContentComponent } from './selective-content.component';

describe('SelectiveContentComponent', () => {
  let component: SelectiveContentComponent;
  let fixture: ComponentFixture<SelectiveContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectiveContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiveContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
