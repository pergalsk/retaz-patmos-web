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
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="badge-strip-handle mb-2">
      <button class="btn btn-light btn-sm" (click)="showMore()">
        {{ opened ? 'Zobraziť menej dátumov' : 'Zobraziť viac dátumov' }}
      </button>
    </div>

    <div class="date-strip mb-3" [class.opened]="opened">
      <ng-container *ngFor="let item of list">
        <a
          *ngIf="item.actual || item.past"
          (click)="onItemClick(item)"
          [class.actual]="actual === item.id"
          [class.weekend]="item.day === 6 || item.day === 7"
          class="date-badge"
        >
          {{ item.format_B }}
        </a>
      </ng-container>
    </div>
  `,
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
