import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, TemplateRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selective-content',
  templateUrl: './selective-content.component.html',
  styleUrls: ['./selective-content.component.scss']
})
export class SelectiveContentComponent implements OnInit, AfterViewInit {
  @Input() contentIndex: any;
  @Input() content: any;
  @Output() selection: EventEmitter<any> = new EventEmitter();

  @ViewChild('topic1') topic1: TemplateRef<any>;
  @ViewChild('topic2') topic2: TemplateRef<any>;
  @ViewChild('topic3') topic3: TemplateRef<any>;

  liveTemplate: TemplateRef<any>;
  templates: any[];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.templates = [
      this.topic1,
      this.topic2,
      this.topic3,
    ];
  }

  selectContent(itemId: number): void {
    this.liveTemplate = this.templates[itemId];
    this.selection.emit(itemId);
  }
}
