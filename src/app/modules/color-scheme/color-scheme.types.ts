export interface ColorSchemeClasses {
  lightSchemeClass: string;
  darkSchemeClass: string;
}

export abstract class ColorSchemeConfig {
  lightSchemeClass: string;
  darkSchemeClass: string;
  storageKey?: string;
}

export enum SCHEMES {
  SYSTEM = 'SYSTEM',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type Scheme = SCHEMES.LIGHT | SCHEMES.DARK;
export type UserScheme = SCHEMES.LIGHT | SCHEMES.DARK | SCHEMES.SYSTEM;
