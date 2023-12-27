import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccesOrderPage } from './succes-order.page';

const routes: Routes = [
  {
    path: '',
    component: SuccesOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccesOrderPageRoutingModule {}
