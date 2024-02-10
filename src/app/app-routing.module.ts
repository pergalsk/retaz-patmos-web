import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYear2024Component } from './modules/year2024/pages/page-year2024/page-year2024.component';
// import { AppShellComponent } from './app-shell/app-shell.component';

const import2021Module = () =>
  import('./modules/year2021/year2021.module').then((m) => m.Year2021Module);

const import2022Module = () =>
  import('./modules/year2022/year2022.module').then((m) => m.Year2022Module);

const import2023Module = () =>
  import('./modules/year2023/year2023.module').then((m) => m.Year2023Module);

const routes: Routes = [
  // { path: 'app-shell--preload', component: AppShellComponent },
  { path: '2021', loadChildren: import2021Module, title: 'Pôstna reťaz 2021' },
  { path: '2022', loadChildren: import2022Module, title: 'Pôstna reťaz 2022' },
  { path: '2023', loadChildren: import2023Module, title: 'Pôstna reťaz 2023' },
  { path: '', component: PageYear2024Component, title: 'Pôstna reťaz 2024' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
