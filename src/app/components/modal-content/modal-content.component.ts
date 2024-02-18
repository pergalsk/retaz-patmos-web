import { Component, OnInit, Input, inject } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoWhitespaceDirective } from '@validators/no-whitespace/no-whitespace.directive';
import { SvgCalendarManComponent } from '@shared/svg/svg-calendar-man/svg-calendar-man.component';

const weekDayNames: string[] = [
  'nedeľu',
  'pondelok',
  'utorok',
  'stredu',
  'štvrtok',
  'piatok',
  'sobotu',
];

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  providers: [DatePipe],
  standalone: true,
  imports: [SvgCalendarManComponent, FormsModule, NoWhitespaceDirective, NgIf],
})
export class ModalContentComponent implements OnInit {
  @Input() public data: { dates: string[]; name: string };

  name: string;
  selectedDatesText: string = '';

  datePipe: DatePipe = inject(DatePipe);
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  ngOnInit(): void {
    let { name, dates } = this.data;

    if (!dates) {
      return;
    }

    this.name = name || '';
    this.selectedDatesText = this.getSelectedDatesText(dates);

    console.log('Modal content initialized! Date = ' + dates[0]);
  }

  confirm(): void {
    this.activeModal.close(this.name);
  }

  getSelectedDatesText(dates: string[]): string {
    if (dates.length === 1) {
      const dateInWeek: Date = new Date(dates[0].valueOf());
      const weekDay = weekDayNames[dateInWeek.getDay()];
      const date = this.datePipe.transform(dates[0], 'd.M.YYYY');
      return `Záväzne zapísať na ${weekDay} ${date}.`;
    }

    if (dates.length > 1 && dates.length <= 4) {
      return `Záväzne zapísať na ${dates.length} vyznačené dátumy.`;
    }

    return `Záväzne zapísať na ${dates.length} vyznačených dátumov.`;
  }
}
