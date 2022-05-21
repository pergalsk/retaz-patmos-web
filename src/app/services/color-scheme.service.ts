import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'dark-theme' | 'light-theme';

@Injectable({ providedIn: 'root' })
export class ColorSchemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setUserTheme(theme?: Theme): void {
    this.setStorage(theme);

    this.document.body.classList.remove('dark-theme');
    this.document.body.classList.remove('light-theme');

    if (theme && theme !== this.getSystemPreference()) {
      this.document.body.classList.add(theme);
    }
  }

  getSystemPreference(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme';
  }

  private getStorage(): string {
    return localStorage.getItem('colorSchemePreference');
  }

  private setStorage(theme: Theme): void {
    if (!theme) {
      localStorage.removeItem('colorSchemePreference');
      return;
    }

    localStorage.setItem('colorSchemePreference', theme);
  }
}
