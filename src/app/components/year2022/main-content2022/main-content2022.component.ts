import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { Scheme } from '@modules/color-scheme/color-scheme.types';
import { ColorSchemeService } from '@modules/color-scheme/color-scheme.service';
import { ColorSchemeSwitcherComponent } from '@shared/components/color-scheme-switcher/color-scheme-switcher.component';
import { ContentBoxComponent } from '@shared/components/content-box/content-box.component';
import { SvgManPrayPlaceholderComponent } from '../svg-man-pray-placeholder/svg-man-pray-placeholder.component';
import { SvgManPrayComponent } from '../svg-man-pray/svg-man-pray.component';

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

  colorSchemeService: ColorSchemeService = inject(ColorSchemeService);

  ngOnInit() {
    this.colorSchemeChange$ = this.colorSchemeService.schemeChange.subscribe((scheme: Scheme) => {
      this.scheme = scheme;
    });
  }

  ngOnDestroy() {
    this.colorSchemeChange$.unsubscribe();
  }
}
