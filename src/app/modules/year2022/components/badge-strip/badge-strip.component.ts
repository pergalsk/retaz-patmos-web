import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface DateBadge {
  id: string;
  date: Date;
  past: boolean;
  actual: boolean;
  future: boolean;
  comparisonResult: number;
  day: number;
  format_A: string;
  format_B: string;
}

@Component({
    selector: 'app-badge-strip',
    templateUrl: './badge-strip.component.html',
    styleUrls: ['./badge-strip.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf],
})
export class BadgeStripComponent {
  @Input() list: DateBadge[];
  @Input() actual: string;
  @Output() itemClick: EventEmitter<DateBadge> = new EventEmitter<DateBadge>();

  opened = false;

  onItemClick(dateId: DateBadge): void {
    this.itemClick.emit(dateId);
  }

  showMore(): void {
    this.opened = !this.opened;
  }
}
