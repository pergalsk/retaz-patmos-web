import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  @Input() public data: { dates: string[]; name: string };

  name: string;
  weekDay = '';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    const { name, dates } = this.data;

    this.name = name || '';

    if (!Array.isArray(dates) || dates.length !== 1) {
      return;
    }

    const date: Date = new Date(dates[0].valueOf());
    this.weekDay = weekDayNames[date.getDay()];

    console.log('Modal content initialized! Date = ' + dates[0]);
  }

  confirm(): void {
    this.activeModal.close(this.name);
  }
}
