import { Component } from '@angular/core';
import { ColorSchemeService } from '../../../color-scheme/color-scheme.service';

@Component({
  selector: 'app-color-scheme-switcher',
  templateUrl: './color-scheme-switcher.component.html',
  styleUrls: ['./color-scheme-switcher.component.scss'],
})
export class ColorSchemeSwitcherComponent {
  constructor(private colorSchemeService: ColorSchemeService) {}

  actualScheme: string;

  setScheme(theme?: string): void {
    this.actualScheme = theme;

    if (theme === 'dark') {
      this.colorSchemeService.setDarkScheme();
      return;
    }

    if (theme === 'light') {
      this.colorSchemeService.setLightScheme();
      return;
    }

    this.colorSchemeService.setSystemScheme();
  }
}
