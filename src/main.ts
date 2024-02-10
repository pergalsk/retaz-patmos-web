import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ColorSchemeModule } from './app/modules/color-scheme/color-scheme.module';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { interceptorProviders } from './app/interceptors';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        // BrowserModule.withServerTransition({ appId: 'serverApp' }),
        NgbModule,
        FormsModule,
        RouterModule,
        ColorSchemeModule.forRoot({
          lightSchemeClass: 'light-theme',
          darkSchemeClass: 'dark-theme',
          storageKey: 'theme',
        }),
      ),
      interceptorProviders,
      provideHttpClient(withInterceptorsFromDi()),
      provideAnimations(),
      provideRouter(routes),
    ],
  }).catch((err) => console.error(err));
});
