import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYear2022Component } from './pages/page-year2022/page-year2022.component';

const routes: Routes = [
  {
    path: '2021',
    loadChildren: () => import('./modules/year2021/year2021.module').then((m) => m.Year2021Module),
  },
  { path: '', component: PageYear2022Component },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
