import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { animations } from './panel-menu.animations';

export interface PanelMenuItem {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.scss'],
  animations,
})
export class PanelMenuComponent implements OnInit {
  @Input() items: PanelMenuItem[];
  @Input() activeIndex: number;
  @Output() selection: EventEmitter<number> = new EventEmitter<number>();

  selectedIdTmp: number;
  menuOpened = false;

  constructor() {}

  ngOnInit(): void {}

  selectPanelContent(id: number): void {
    if (id === this.activeIndex) {
      return;
    }

    this.togglePanelMenu(false);
    // store selected ID and wait for animation finish
    this.selectedIdTmp = id;

    console.log(`Stored selected content-id = ${id}`);
  }

  togglePanelMenu(opened?: boolean): void {
    this.menuOpened = typeof opened !== 'undefined' ? opened : !this.menuOpened;
  }

  leaveAnimEnd(event: AnimationEvent): void {
    if (event.toState === 'void' && this.selectedIdTmp != null) {
      // get last selected ID and destroy
      this.selection.emit(this.selectedIdTmp);
      console.log(`Emitted content-id = ${this.selectedIdTmp}`);
      this.selectedIdTmp = null;
    }
  }
}
