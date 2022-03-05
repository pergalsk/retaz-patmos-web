import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  Input,
  Output,
  ViewChild,
  TemplateRef,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { transition, trigger, useAnimation, AnimationEvent } from '@angular/animations';
import { contentEnterAnim, contentLeaveAnim } from '../animations/contentAnimations';
import { PanelMenuItem } from '../panel-menu/panel-menu.component';

@Component({
  selector: 'app-selective-content',
  templateUrl: './selective-content.component.html',
  styleUrls: ['./selective-content.component.scss'],
  animations: [
    trigger('enterLeaveTrigger', [
      transition(':enter', [useAnimation(contentEnterAnim)]),
      transition(':leave', [useAnimation(contentLeaveAnim)]),
    ]),
  ],
})
export class SelectiveContentComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() content: PanelMenuItem[];
  @Input() contentIndex: number;
  @Output() selection: EventEmitter<any> = new EventEmitter();

  // @ViewChild('topic1') topic1: TemplateRef<any>;
  // @ViewChild('topic2') topic2: TemplateRef<any>;
  // @ViewChild('topic3') topic3: TemplateRef<any>;

  // liveTemplate: TemplateRef<any>;
  // templates: any[];
  // private contentIndexInternal: number;
  visible: boolean;

  constructor() {}

  ngOnInit(): void {
    // this.contentIndexInternal = this.contentIndex;
    this.visible = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contentIndex.currentValue !== this.contentIndex) {
      return;
    }

    this.visible = false; // trigger leave animation
    // this.contentIndexInternal = this.contentIndex;
  }

  ngAfterViewInit(): void {
    // this.templates = [this.topic1, this.topic2, this.topic3];
  }

  selectContent(itemId: number): void {
    // this.liveTemplate = this.templates[itemId];
    this.selection.emit(itemId);
  }

  animDone(event: AnimationEvent) {
    this.visible = true;
  }
}
