import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgConnectComponent } from './svg-connect.component';

describe('SvgConnectComponent', () => {
  let component: SvgConnectComponent;
  let fixture: ComponentFixture<SvgConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgConnectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
