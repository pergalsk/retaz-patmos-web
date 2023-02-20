import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYear2023Component } from './modules/year2023/pages/page-year2023/page-year2023.component';
import { AppShellComponent } from './app-shell/app-shell.component';

const import2021Module = () =>
  import('./modules/year2021/year2021.module').then((m) => m.Year2021Module);

const import2022Module = () =>
  import('./modules/year2022/year2022.module').then((m) => m.Year2022Module);

const routes: Routes = [
  { path: 'app-shell--preload', component: AppShellComponent },
  { path: '2021', loadChildren: import2021Module },
  { path: '2022', loadChildren: import2022Module },
  { path: '', component: PageYear2023Component },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
