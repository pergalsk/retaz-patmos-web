import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCalHeader } from './header';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NgxCalHeader component', (): void => {
  let fixture: ComponentFixture<NgxCalHeader>;
  let component: NgxCalHeader;
  let debugEl: DebugElement;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      providers: [NgxCalHeader],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCalHeader);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });

  it('should instantiate component', (): void => {
    expect(component).toBeDefined();
  });

  it('should render one "calendar-header" element', () => {
    fixture.detectChanges();
    const calendarHeaderEls = debugEl.queryAll(By.css('.calendar-header'));
    expect(calendarHeaderEls.length).toBe(1);
  });

  it('should render correct amount of "header-cell" elements', () => {
    const testTitles = ['one', 'two', 'three'];

    component.titles = [...testTitles];
    fixture.detectChanges();

    const calendarHeaderEls: DebugElement[] = debugEl.queryAll(
      By.css('.calendar-header > .header-cell')
    );
    expect(calendarHeaderEls.length).withContext('cells length').toBe(testTitles.length);

    for (const key in testTitles) {
      expect(calendarHeaderEls[key].nativeElement.textContent)
        .withContext('each cell with correct title')
        .toBe(testTitles[key]);
    }
  });
});
