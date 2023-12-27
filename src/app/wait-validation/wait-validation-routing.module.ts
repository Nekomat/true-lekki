import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitValidationPage } from './wait-validation.page';

const routes: Routes = [
  {
    path: '',
    component: WaitValidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitValidationPageRoutingModule {}
