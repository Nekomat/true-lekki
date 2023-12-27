import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitValidationPageRoutingModule } from './wait-validation-routing.module';

import { WaitValidationPage } from './wait-validation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitValidationPageRoutingModule
  ],
  declarations: [WaitValidationPage]
})
export class WaitValidationPageModule {}
