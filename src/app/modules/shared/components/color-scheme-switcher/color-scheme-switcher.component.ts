import { Component } from '@angular/core';
import { Theme, ColorSchemeService } from '../../../../services/color-scheme.service';

@Component({
  selector: 'app-color-scheme-switcher',
  templateUrl: './color-scheme-switcher.component.html',
  styleUrls: ['./color-scheme-switcher.component.scss'],
})
export class ColorSchemeSwitcherComponent {
  constructor(private colorSchemeService: ColorSchemeService) {}

  setTheme(theme?: Theme): void {
    this.colorSchemeService.setUserTheme(theme);
  }
}
