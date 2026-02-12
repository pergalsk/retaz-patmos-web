import { Routes } from '@angular/router';
import { PageYear2026Component } from '@components/year2026/page-year2026/page-year2026.component';
import { MaintenanceScreenComponent } from '@components/maintenance-screen/maintenance-screen.component';
import { FooterLayoutComponent } from '@components/layouts/footer-layout/footer-layout.component';
import { EmptyLayoutComponent } from '@components/layouts/empty-layout/empty-layout.component';
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

const import2025Component = () =>
  import('./components/year2025/page-year2025/page-year2025.component').then(
    (mod) => mod.PageYear2025Component,
  );

export const routes: Routes = [
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        title: 'Pôst 2026',
        component: MaintenanceScreenComponent,
      },
    ],
  },
  {
    path: '',
    component: FooterLayoutComponent,
    children: [
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
        path: '2025',
        title: 'Pôstna reťaz 2025',
        loadComponent: import2025Component,
      },
      {
        path: '2026',
        title: 'Pôst 2026',
        component: PageYear2026Component,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
