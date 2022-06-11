import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSchemeConfig } from './color-scheme.types';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ColorSchemeModule {
  constructor(@Optional() @SkipSelf() parentModule: ColorSchemeModule) {
    if (parentModule) {
      throw new Error('ColorSchemeModule is already loaded. Import it in the AppModule only.');
    }
  }

  static forRoot(config: ColorSchemeConfig): ModuleWithProviders<ColorSchemeModule> {
    return {
      ngModule: ColorSchemeModule,
      providers: [{ provide: ColorSchemeConfig, useValue: config }],
    };
  }
}
