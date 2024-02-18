import { Component, Input, OnInit } from '@angular/core';
import { SafePipe } from '@pipes/safe.pipe';

@Component({
  selector: 'app-youtube-embedded',
  templateUrl: './youtube-embedded.component.html',
  styleUrls: ['./youtube-embedded.component.scss'],
  standalone: true,
  imports: [SafePipe],
})
export class YoutubeEmbeddedComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() code: string;

  url: string;

  constructor() {}

  ngOnInit(): void {
    this.url = 'https://www.youtube.com/embed/' + encodeURIComponent(this.code);
  }
}
