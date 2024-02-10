import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeEmbeddedComponent } from './youtube-embedded.component';

describe('YoutubeEmbededComponent', () => {
  let component: YoutubeEmbeddedComponent;
  let fixture: ComponentFixture<YoutubeEmbeddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [YoutubeEmbeddedComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeEmbeddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
