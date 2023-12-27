import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesPage } from './mes.page';

const routes: Routes = [
  {
    path: '',
    component: MesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesPageRoutingModule {}
