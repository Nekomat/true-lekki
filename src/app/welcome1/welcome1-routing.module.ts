import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Welcome1Page } from './welcome1.page';

const routes: Routes = [
  {
    path: '',
    component: Welcome1Page
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Welcome1PageRoutingModule {}
