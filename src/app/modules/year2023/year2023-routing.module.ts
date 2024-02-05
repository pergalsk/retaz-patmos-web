import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYear2023Component } from './pages/page-year2023/page-year2023.component';

const routes: Routes = [
  {
    path: '',
    component: PageYear2023Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Year2023RoutingModule {}
