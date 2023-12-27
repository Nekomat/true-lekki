import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfidentialitePage } from './confidentialite.page';

const routes: Routes = [
  {
    path: '',
    component: ConfidentialitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfidentialitePageRoutingModule {}
