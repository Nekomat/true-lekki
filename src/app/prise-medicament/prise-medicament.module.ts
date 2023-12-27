import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriseMedicamentPageRoutingModule } from './prise-medicament-routing.module';

import { PriseMedicamentPage } from './prise-medicament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriseMedicamentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PriseMedicamentPage]
})
export class PriseMedicamentPageModule {}
