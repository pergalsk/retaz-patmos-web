import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { transition, trigger, useAnimation, AnimationEvent } from '@angular/animations';
import { contentEnterAnim, contentLeaveAnim } from '../../../animations/contentAnimations';
import { PanelMenuItem, PanelMenuComponent } from '../panel-menu/panel-menu.component';
import { Content07Component } from '../content07/content07.component';
import { Content06Component } from '../content06/content06.component';
import { Content05Component } from '../content05/content05.component';
import { Content04Component } from '../content04/content04.component';
import { Content03Component } from '../content03/content03.component';
import { Content02Component } from '../content02/content02.component';
import { Content01Component } from '../content01/content01.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-selective-content',
  templateUrl: './selective-content.component.html',
  animations: [
    trigger('enterLeaveTrigger', [
      transition(':enter', [useAnimation(contentEnterAnim)]),
      transition(':leave', [useAnimation(contentLeaveAnim)]),
    ]),
  ],
  standalone: true,
  imports: [
    NgIf,
    PanelMenuComponent,
    Content01Component,
    Content02Component,
    Content03Component,
    Content04Component,
    Content05Component,
    Content06Component,
    Content07Component,
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
