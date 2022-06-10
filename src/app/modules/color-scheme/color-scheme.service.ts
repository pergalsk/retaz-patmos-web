import { Injectable, Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Observer, Subject, combineLatest, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, startWith, map, pairwise, filter } from 'rxjs/operators';

export class ColorSchemeConfig {
  lightSchemeClass: string;
  darkSchemeClass: string;
  storageKey: string;
}

const schemes = ['dark-theme', 'light-theme'] as const;
export type Scheme = typeof schemes[number];
export type SchemePair = [Scheme, Scheme];

@Injectable({ providedIn: 'root' })
export class ColorSchemeService {
  public systemSchemeChange: Observable<Scheme>;
  public userSchemeChange: Observable<Scheme>;
  public schemeChange: Observable<Scheme>;

  private userSchemeSubject = new Subject<Scheme>();

  private schemesList: Scheme[] = [...schemes];
  private mediaQuery = '(prefers-color-scheme: dark)';
  private storageName = 'colorSchemePreference';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Optional() config?: ColorSchemeConfig
  ) {
    if (config) {
      console.log(config);
    }

    this.systemSchemeChange = new Observable<Scheme>(this.systemSchemeObservableFn.bind(this)).pipe(
      distinctUntilChanged()
    );

    this.userSchemeChange = this.userSchemeSubject.pipe(distinctUntilChanged());

    this.schemeChange = combineLatest([
      this.systemSchemeChange.pipe(startWith(this.getSystemPreference())),
      this.userSchemeChange.pipe(startWith(this.getStorage())),
    ]).pipe(
      startWith<SchemePair>([null, null]),
      distinctUntilChanged(this.distinctArrSchemes),
      pairwise(),
      map(this.chooseSchemeValue),
      filter((scheme: Scheme): boolean => !!scheme)
    );
  }

  setDarkScheme(): void {
    this.setUserScheme('dark-theme');
  }

  setLightScheme(): void {
    this.setUserScheme('light-theme');
  }

  setSystemScheme(): void {
    this.setUserScheme(null);
  }

  getScheme(): Scheme {
    return this.getStorage() || this.getSystemPreference();
  }

  getSystemPreference(): Scheme {
    return window.matchMedia(this.mediaQuery).matches ? 'dark-theme' : 'light-theme';
  }

  private setUserScheme(scheme?: Scheme): void {
    this.document.body.classList.remove(...this.schemesList);
    this.document.body.classList.add(scheme);
    this.setStorage(scheme);
    this.userSchemeSubject.next(scheme);
  }

  private systemSchemeObservableFn(observer: Observer<Scheme>): Unsubscribable {
    const handleChange = (event: MediaQueryListEvent): void => {
      const scheme: Scheme = event.matches ? 'dark-theme' : 'light-theme';
      observer.next(scheme);
    };

    const prefersSchemeDark: MediaQueryList = window.matchMedia(this.mediaQuery);
    prefersSchemeDark.addEventListener('change', handleChange);

    return {
      unsubscribe(): void {
        prefersSchemeDark.removeEventListener('change', handleChange);
      },
    };
  }

  private getStorage(): Scheme | null {
    const scheme = localStorage.getItem(this.storageName) as Scheme;
    return this.schemesList.includes(scheme) ? scheme : null;
  }

  private setStorage(scheme?: Scheme): void {
    if (!scheme) {
      localStorage.removeItem(this.storageName);
      return;
    }
    if (!this.schemesList.includes(scheme)) {
      return;
    }
    localStorage.setItem(this.storageName, scheme);
  }

  private distinctArrSchemes(prev: SchemePair, curr: SchemePair): boolean {
    return prev[0] === curr[0] && prev[1] === curr[1];
  }

  private chooseSchemeValue([[prevSys, prevUsr], [nextSys, nextUsr]]: [
    SchemePair,
    SchemePair
  ]): Scheme {
    if (
      (prevUsr !== nextUsr && prevUsr && nextUsr) ||
      (prevUsr !== nextUsr && prevSys !== nextUsr && !prevUsr)
    ) {
      return nextUsr;
    }

    if (
      (prevSys !== nextSys && !prevUsr && !nextUsr) ||
      (prevUsr !== nextUsr && prevUsr !== nextSys && !nextUsr)
    ) {
      return nextSys;
    }

    // more readable:
    /*if (prevUsr !== nextUsr) {
      if (prevUsr && nextUsr) {
        return nextUsr;
      }
      if (!prevUsr && prevSys !== nextUsr) {
        return nextUsr;
      }
      if (!nextUsr && prevUsr !== nextSys) {
        return nextSys;
      }
    }

    if (prevSys !== nextSys) {
      if (!prevUsr && !nextUsr) {
        return nextSys;
      }
    }*/
  }
}
