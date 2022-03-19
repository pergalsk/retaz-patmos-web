import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYear2021Component } from './pages/page-year2021/page-year2021.component';

const routes: Routes = [
  {
    path: '',
    component: PageYear2021Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Year2021RoutingModule {}
