import { Routes } from '@angular/router';
import { PageYear2025Component } from '@components/year2025/page-year2025/page-year2025.component';
// import { AppShellComponent } from "@components/app-shell/app-shell.component";

const import2021Component = () =>
  import('./components/year2021/page-year2021/page-year2021.component').then(
    (m) => m.PageYear2021Component,
  );

const import2022Component = () =>
  import('./components/year2022/page-year2022/page-year2022.component').then(
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
    path: '2024',
    title: 'Pôstna reťaz 2024',
    loadComponent: import2024Component,
  },
  {
    path: '',
    title: 'Pôstna reťaz 2025',
    component: PageYear2025Component,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
