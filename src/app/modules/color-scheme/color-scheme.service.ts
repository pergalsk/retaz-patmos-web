import { Injectable, Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  Observable,
  Observer,
  Subject,
  BehaviorSubject,
  combineLatest,
  Unsubscribable,
} from 'rxjs';
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

  private readonly userSchemeSubject;

  private readonly storageKey: string = 'color-scheme-preference';
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
      this.storageKey = config.storageKey;
    }

    this.systemSchemeChange = new Observable<Scheme>(this.systemSchemeObservableFn.bind(this)).pipe(
      distinctUntilChanged()
    );

    this.userSchemeSubject = new BehaviorSubject<UserScheme>(this.loadUserScheme());
    this.userSchemeChange = this.userSchemeSubject.pipe(distinctUntilChanged());

    this.schemeChange = combineLatest([this.systemSchemeChange, this.userSchemeChange]).pipe(
      startWith<[Scheme, UserScheme]>([null, null]),
      distinctUntilChanged(this.distinctArrSchemes),
      pairwise(),
      map(this.chooseSchemeValue),
      filter((scheme: Scheme): boolean => scheme === SCHEMES.LIGHT || scheme === SCHEMES.DARK)
    );
  }

  getScheme(): Scheme | UserScheme {
    return this.loadUserScheme() || this.getSystemPreference();
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
    this.storeUserScheme(className);
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

  private getSchemeName(className?: string): UserScheme {
    if (className === this.schemeClasses.lightSchemeClass) {
      return SCHEMES.LIGHT;
    }
    if (className === this.schemeClasses.darkSchemeClass) {
      return SCHEMES.DARK;
    }
    return SCHEMES.SYSTEM;
  }

  private systemSchemeObservableFn(observer: Observer<Scheme>): Unsubscribable {
    observer.next(this.getSystemPreference()); // initial emit

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

  private loadUserScheme(): UserScheme {
    const className: string | null = localStorage.getItem(this.storageKey);
    return this.getSchemeName(className);
  }

  private storeUserScheme(scheme?: string): void {
    if (!scheme) {
      localStorage.removeItem(this.storageKey);
      return;
    }
    if (!this.classList.includes(scheme)) {
      return;
    }
    localStorage.setItem(this.storageKey, scheme);
  }

  private distinctArrSchemes(prev: [Scheme, UserScheme], curr: [Scheme, UserScheme]): boolean {
    return prev[0] === curr[0] && prev[1] === curr[1];
  }

  private chooseSchemeValue([[prevSys, prevUsr], [nextSys, nextUsr]]: [
    [Scheme, UserScheme],
    [Scheme, UserScheme]
  ]): Scheme {
    // set 'SYSTEM' as null for better handling
    const _nextUsr = nextUsr === SCHEMES.SYSTEM ? null : nextUsr;
    const _prevUsr = prevUsr === SCHEMES.SYSTEM ? null : prevUsr;

    if (
      (_prevUsr !== _nextUsr && _prevUsr && _nextUsr) ||
      (_prevUsr !== _nextUsr && prevSys !== _nextUsr && !_prevUsr)
    ) {
      return _nextUsr;
    }

    if (
      (prevSys !== nextSys && !_prevUsr && !_nextUsr) ||
      (_prevUsr !== _nextUsr && _prevUsr !== nextSys && !_nextUsr)
    ) {
      return nextSys;
    }
  }
}
