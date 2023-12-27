import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriseMedicamentPage } from './prise-medicament.page';

const routes: Routes = [
  {
    path: '',
    component: PriseMedicamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriseMedicamentPageRoutingModule {}
