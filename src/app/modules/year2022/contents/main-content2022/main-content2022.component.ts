import { Component, Input, OnInit } from '@angular/core';
import { ColorSchemeService } from '../../../color-scheme/color-scheme.service';
import { Scheme } from '../../../color-scheme/color-scheme.types';

@Component({
  selector: 'app-main-content2022',
  templateUrl: './main-content2022.component.html',
  styleUrls: ['./main-content2022.component.scss'],
})
export class MainContent2022Component implements OnInit {
  @Input() placeholder = false;

  scheme: Scheme;
  colorSchemeChange$;

  constructor(private colorSchemeService: ColorSchemeService) {}

  ngOnInit() {
    this.colorSchemeChange$ = this.colorSchemeService.schemeChange.subscribe((scheme: Scheme) => {
      this.scheme = scheme;
    });
  }
}
