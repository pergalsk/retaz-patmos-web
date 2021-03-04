import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  @Input() public date;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  name: '';
  weekDay = '';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    const weekDayNames = ['nedeľu', 'pondelok', 'utorok', 'stredu', 'štvrtok', 'piatok', 'sobotu'];

    if (this.date?.date) {
      const date = new Date(this.date.date.valueOf());
      this.weekDay = weekDayNames[date.getDay()];
    }

    console.log('Modal content initialized! Date = ' + this.date.date);
  }

  passBack(): void {
    this.passEntry.emit(this.name);
    this.activeModal.close(this.name);
  }
}
