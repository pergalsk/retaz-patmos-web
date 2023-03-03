import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ColorSchemeService } from '../../../color-scheme/color-scheme.service';
import { Scheme } from '../../../color-scheme/color-scheme.types';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-content2022',
  templateUrl: './main-content2022.component.html',
  styleUrls: ['./main-content2022.component.scss'],
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
