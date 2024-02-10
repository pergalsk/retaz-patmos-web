import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { interceptorProviders } from './interceptors';
import { AppComponent } from './app.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { AppRoutingModule } from './app-routing.module';

import { ColorSchemeModule } from './modules/color-scheme/color-scheme.module';

import { RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    ColorSchemeModule.forRoot({
      lightSchemeClass: 'light-theme',
      darkSchemeClass: 'dark-theme',
      storageKey: 'theme',
    }),
    ModalContentComponent,
    AppShellComponent,
    FooterComponent,
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
