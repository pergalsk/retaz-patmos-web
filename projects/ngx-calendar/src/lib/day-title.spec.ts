import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxCalDayTitle } from './day-title';

describe('NgxCalDayTitle component', (): void => {
  let fixture: ComponentFixture<NgxCalDayTitle>;
  let component: NgxCalDayTitle;
  let debugEl: DebugElement;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      providers: [NgxCalDayTitle],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(NgxCalDayTitle);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });

  it('should instantiate NgxCalDayTitle component', () => {
    expect(component).toBeDefined();
  });

  it('should reflect title change', (): void => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const titleEls: DebugElement[] = debugEl.queryAll(By.css('.title'));
    expect(titleEls[0].nativeElement.innerText).toBe('Test Title');
  });
});
