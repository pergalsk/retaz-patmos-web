import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYear2021Component } from './pages/page-year2021/page-year2021.component';
import { PageYear2022Component } from './pages/page-year2022/page-year2022.component';

const routes: Routes = [
  { path: '2021', component: PageYear2021Component },
  { path: '', component: PageYear2022Component },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
