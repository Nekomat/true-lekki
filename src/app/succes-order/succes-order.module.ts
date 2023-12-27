import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccesOrderPageRoutingModule } from './succes-order-routing.module';

import { SuccesOrderPage } from './succes-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccesOrderPageRoutingModule
  ],
  declarations: [SuccesOrderPage]
})
export class SuccesOrderPageModule {}
