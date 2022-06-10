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

import { Year2022Module } from './modules/year2022/year2022.module';
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
    Year2022Module,
    RouterModule,
    ColorSchemeModule.forRoot({
      darkSchemeClass: 'darkSchemeClass',
      lightSchemeClass: 'lightSchemeClass',
      storageKey: 'storageKey',
    }),
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
