import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss']
})
export class PanelMenuComponent implements OnInit {
  @Input() items: any[];
  @Input() activeIndex: number;
  @Output() selection: EventEmitter<number> = new EventEmitter<number>();

  menuOpened = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectPanelContent(id: number): void {
    console.log('panel-menu-c = ' + id);
    if (id === this.activeIndex) {
      return;
    }

    this.togglePanelMenu(false);
    this.selection.emit(id);
  }

  togglePanelMenu(opened?: boolean): void {
    this.menuOpened = typeof opened !== 'undefined' ? opened : !this.menuOpened;
  }
}
