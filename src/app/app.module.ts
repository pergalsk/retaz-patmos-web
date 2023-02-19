import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { interceptorProviders } from './interceptors';
import { AppComponent } from './app.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { ColorSchemeModule } from './modules/color-scheme/color-scheme.module';

import { Year2023Module } from './modules/year2023/year2023.module';
import { RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';

@NgModule({
  declarations: [AppComponent, ModalContentComponent, AppShellComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    Year2023Module,
    RouterModule,
    ColorSchemeModule.forRoot({
      lightSchemeClass: 'light-theme',
      darkSchemeClass: 'dark-theme',
      storageKey: 'theme',
    }),
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
