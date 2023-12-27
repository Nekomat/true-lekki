import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PharmacieDetailPageRoutingModule } from './pharmacie-detail-routing.module';

import { PharmacieDetailPage } from './pharmacie-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PharmacieDetailPageRoutingModule
  ],
  declarations: [PharmacieDetailPage]
})
export class PharmacieDetailPageModule {}
