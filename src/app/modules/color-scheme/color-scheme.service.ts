import { Injectable, Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Observer, Subject, combineLatest, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, startWith, map, pairwise, filter } from 'rxjs/operators';
import {
  ColorSchemeClasses,
  ColorSchemeConfig,
  SCHEMES,
  Scheme,
  UserScheme,
} from './color-scheme.types';

@Injectable({ providedIn: 'root' })
export class ColorSchemeService {
  public readonly systemSchemeChange: Observable<Scheme>;
  public readonly userSchemeChange: Observable<UserScheme>;
  public readonly schemeChange: Observable<Scheme>;

  public readonly userSchemeSubject = new Subject<UserScheme>();

  private readonly storageName: string = 'color-scheme-preference';
  private readonly mediaQuery: string = '(prefers-color-scheme: dark)';

  private readonly schemeClasses: ColorSchemeClasses = {
    lightSchemeClass: 'light-scheme',
    darkSchemeClass: 'dark-scheme',
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Optional() config?: ColorSchemeConfig
  ) {
    if (config?.lightSchemeClass && config?.darkSchemeClass) {
      this.schemeClasses = {
        lightSchemeClass: config.lightSchemeClass,
        darkSchemeClass: config.darkSchemeClass,
      };
    }
    if (config?.storageKey) {
      this.storageName = config.storageKey;
    }

    this.systemSchemeChange = new Observable<Scheme>(this.systemSchemeObservableFn.bind(this)).pipe(
      distinctUntilChanged()
    );

    this.userSchemeChange = this.userSchemeSubject.pipe(distinctUntilChanged());

    this.schemeChange = combineLatest([
      this.systemSchemeChange.pipe(startWith(this.getSystemPreference())),
      this.userSchemeChange.pipe(startWith(this.getStorage())),
    ]).pipe(
      startWith<[Scheme, Scheme]>([null, null]),
      distinctUntilChanged(this.distinctArrSchemes),
      pairwise(),
      map(this.chooseSchemeValue),
      filter((scheme: Scheme): boolean => scheme === SCHEMES.LIGHT || scheme === SCHEMES.DARK)
    );
  }

  getScheme(): Scheme {
    return this.getStorage() || this.getSystemPreference();
  }

  setLightScheme(): void {
    this.setUserScheme(SCHEMES.LIGHT);
  }

  setDarkScheme(): void {
    this.setUserScheme(SCHEMES.DARK);
  }

  setSystemScheme(): void {
    this.setUserScheme(SCHEMES.SYSTEM);
  }

  getSystemPreference(): Scheme {
    return window.matchMedia(this.mediaQuery).matches ? SCHEMES.DARK : SCHEMES.LIGHT;
  }

  private get classList(): string[] {
    return Object.values(this.schemeClasses);
  }

  private setUserScheme(scheme: UserScheme): void {
    const className: string | null = this.getClassName(scheme);
    this.document.body.classList.remove(...this.classList);
    className && this.document.body.classList.add(className);
    this.setStorage(className);
    this.userSchemeSubject.next(scheme);
  }

  private getClassName(scheme: UserScheme): string | null {
    if (scheme === SCHEMES.LIGHT) {
      return this.schemeClasses.lightSchemeClass;
    }
    if (scheme === SCHEMES.DARK) {
      return this.schemeClasses.darkSchemeClass;
    }
    return null;
  }

  private systemSchemeObservableFn(observer: Observer<Scheme>): Unsubscribable {
    const handleChange = (event: MediaQueryListEvent): void => {
      const scheme: Scheme = event.matches ? SCHEMES.DARK : SCHEMES.LIGHT;
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
    return this.classList.includes(scheme) ? scheme : null;
  }

  private setStorage(scheme?: string): void {
    if (!scheme) {
      localStorage.removeItem(this.storageName);
      return;
    }
    if (!this.classList.includes(scheme)) {
      return;
    }
    localStorage.setItem(this.storageName, scheme);
  }

  private distinctArrSchemes(prev: [Scheme, Scheme], curr: [Scheme, Scheme]): boolean {
    return prev[0] === curr[0] && prev[1] === curr[1];
  }

  private chooseSchemeValue([[prevSys, prevUsr], [nextSys, nextUsr]]: [
    [Scheme, Scheme],
    [Scheme, Scheme]
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
