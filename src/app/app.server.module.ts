import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { Year2023Module } from './modules/year2023/year2023.module';
import { AppComponent } from './app.component';
// import { AppShellComponent } from './app-shell/app-shell.component';

const routes: Routes = [
  /*{ path: 'app-shell--preload', component: AppShellComponent }*/
];

@NgModule({
  imports: [AppModule, /*ServerModule,*/ Year2023Module, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
  declarations: [
    /*AppShellComponent*/
  ],
})
export class AppServerModule {}
