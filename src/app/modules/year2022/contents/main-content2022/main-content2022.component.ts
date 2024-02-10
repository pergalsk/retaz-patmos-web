import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ColorSchemeService } from '../../../color-scheme/color-scheme.service';
import { Scheme } from '../../../color-scheme/color-scheme.types';
import { Subscription } from 'rxjs';
import { SvgManPrayPlaceholderComponent } from '../../svg/svg-man-pray-placeholder/svg-man-pray-placeholder.component';
import { SvgManPrayComponent } from '../../svg/svg-man-pray/svg-man-pray.component';
import { NgIf } from '@angular/common';
import { ColorSchemeSwitcherComponent } from '../../../shared/components/color-scheme-switcher/color-scheme-switcher.component';
import { ContentBoxComponent } from '../../../shared/components/content-box/content-box.component';

@Component({
  selector: 'app-main-content2022',
  templateUrl: './main-content2022.component.html',
  styleUrls: ['./main-content2022.component.scss'],
  standalone: true,
  imports: [
    ContentBoxComponent,
    ColorSchemeSwitcherComponent,
    NgIf,
    SvgManPrayComponent,
    SvgManPrayPlaceholderComponent,
  ],
})
export class MainContent2022Component implements OnInit, OnDestroy {
  @Input() placeholder = false;

  scheme: Scheme;
  colorSchemeChange$: Subscription;

  constructor(private colorSchemeService: ColorSchemeService) {}

  ngOnInit() {
    this.colorSchemeChange$ = this.colorSchemeService.schemeChange.subscribe((scheme: Scheme) => {
      this.scheme = scheme;
    });
  }

  ngOnDestroy() {
    this.colorSchemeChange$.unsubscribe();
  }
}
