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
import { SharedModule } from '@shared/shared.module';
import { ColorSchemeModule } from './modules/color-scheme/color-scheme.module';
import { NgxCalendarModule } from 'projects/ngx-calendar/src/lib/calendar.module';

import { Year2024Module } from './modules/year2024/year2024.module';
import { RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        NgbModule,
        FormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        Year2024Module,
        RouterModule,
        NgxCalendarModule,
        ColorSchemeModule.forRoot({
            lightSchemeClass: 'light-theme',
            darkSchemeClass: 'dark-theme',
            storageKey: 'theme',
        }),
        ModalContentComponent, AppShellComponent,
    ],
    providers: [interceptorProviders],
    bootstrap: [AppComponent],
})
export class AppModule {}
