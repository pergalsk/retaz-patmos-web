import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { NgForOf, NgTemplateOutlet } from '@angular/common';

export interface HeaderContext {
  $implicit: string[];
}

export interface HeaderCellContext {
  $implicit: string;
}

@Component({
  selector: 'ngx-cal-header',
  standalone: true,
  imports: [NgForOf, NgTemplateOutlet],
  template: `
    <ng-container
      [ngTemplateOutlet]="headerTpl || headerDefaultTpl"
      [ngTemplateOutletContext]="{ $implicit: titles }"
    ></ng-container>

    <ng-template #headerDefaultTpl let-dayNames>
      <div class="calendar-header">
        <ng-container
          *ngFor="let dayName of dayNames"
          [ngTemplateOutlet]="headerCellTpl || headerCellDefaultTpl"
          [ngTemplateOutletContext]="{ $implicit: dayName }"
        ></ng-container>
      </div>
    </ng-template>

    <ng-template #headerCellDefaultTpl let-dayName>
      <div class="header-cell">{{ dayName }}</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCalHeader {
  @Input()
  titles: string[] = [];

  @Input('headerTemplate')
  headerTpl: TemplateRef<HeaderContext>;

  @Input('headerCellTemplate')
  headerCellTpl: TemplateRef<HeaderCellContext>;
}
