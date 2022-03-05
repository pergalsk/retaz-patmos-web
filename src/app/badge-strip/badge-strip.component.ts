import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-badge-strip',
  templateUrl: './badge-strip.component.html',
  styleUrls: ['./badge-strip.component.scss'],
})
export class BadgeStripComponent {
  @Input() list: any[];
  @Input() actual: string;
  @Output() dateClick: EventEmitter<string> = new EventEmitter<string>();

  onDateClick(dateId: string) {
    return this.dateClick.emit(dateId);
  }
}
