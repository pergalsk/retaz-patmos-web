import { Routes } from '@angular/router';
import { PageYear2024Component } from '@components/year2024/page-year2024/page-year2024.component';
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
  import('./components/year2023/page-year2023/page-year2023.component').then(
    (mod) => mod.PageYear2023Component,
  );

const import2024Component = () =>
  import('./components/year2024/page-year2024/page-year2024.component').then(
    (mod) => mod.PageYear2024Component,
  );

export const routes: Routes = [
  // { path: 'app-shell--preload', component: AppShellComponent },
  {
    path: '2021',
    title: 'Pôstna reťaz 2021',
    loadComponent: import2021Component,
  },
  {
    path: '2022',
    title: 'Pôstne modlitby 2022',
    children: [
      { path: ':date', loadComponent: import2022Component },
      { path: '', loadComponent: import2022Component },
    ],
  },
  {
    path: '2023',
    title: 'Pôstna reťaz 2023',
    loadComponent: import2023Component,
  },
  {
    path: '',
    title: 'Pôstna reťaz 2024',
    component: PageYear2024Component,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
