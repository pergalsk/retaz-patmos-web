import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColorSchemeService } from '../../../color-scheme/color-scheme.service';
import { SCHEMES, UserScheme } from '../../../color-scheme/color-scheme.types';

@Component({
  selector: 'app-color-scheme-switcher',
  templateUrl: './color-scheme-switcher.component.html',
  styleUrls: ['./color-scheme-switcher.component.scss'],
})
export class ColorSchemeSwitcherComponent implements OnInit, OnDestroy {
  actualScheme: UserScheme;
  SCHEMES = SCHEMES;

  userSchemeChange$;

  constructor(public colorSchemeService: ColorSchemeService) {}

  ngOnInit() {
    this.userSchemeChange$ = this.colorSchemeService.schemeChange.subscribe(
      (scheme: UserScheme) => {
        this.actualScheme = scheme;
      }
    );
  }
  ngOnDestroy() {
    this.userSchemeChange$.unsubscribe();
  }

  /*  setScheme(theme?: string): void {
    if (theme === 'dark') {
      this.colorSchemeService.setDarkScheme();
      return;
    }

    if (theme === 'light') {
      this.colorSchemeService.setLightScheme();
      return;
    }

    this.colorSchemeService.setSystemScheme();
  }*/
}
