import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYear2022Component } from './pages/page-year2022/page-year2022.component';

const routes: Routes = [
  { path: ':date', component: PageYear2022Component },
  { path: '', component: PageYear2022Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Year2022RoutingModule {}
