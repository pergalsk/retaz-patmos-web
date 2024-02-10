import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYear2024Component } from './modules/year2024/pages/page-year2024/page-year2024.component';
// import { AppShellComponent } from './app-shell/app-shell.component';

const import2021Component = () =>
  import('./modules/year2021/pages/page-year2021/page-year2021.component').then(
    (m) => m.PageYear2021Component,
  );

const import2022Component = () =>
  import('./modules/year2022/pages/page-year2022/page-year2022.component').then(
    (m) => m.PageYear2022Component,
  );

const import2023Component = () =>
  import('./modules/year2023/pages/page-year2023/page-year2023.component').then(
    (mod) => mod.PageYear2023Component,
  );

export const routes: Routes = [
  // { path: 'app-shell--preload', component: AppShellComponent },
  { path: '2021', loadComponent: import2021Component, title: 'Pôstna reťaz 2021' },
  { path: '2022', loadComponent: import2022Component, title: 'Pôstna reťaz 2022' },
  { path: '2023', loadComponent: import2023Component, title: 'Pôstna reťaz 2023' },
  { path: '', component: PageYear2024Component, title: 'Pôstna reťaz 2024' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
