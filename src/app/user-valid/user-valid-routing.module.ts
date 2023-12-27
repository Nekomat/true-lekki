import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserValidPage } from './user-valid.page';

const routes: Routes = [
  {
    path: '',
    component: UserValidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserValidPageRoutingModule {}
