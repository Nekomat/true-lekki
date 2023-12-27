import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesPageRoutingModule } from './mes-routing.module';

import { MesPage } from './mes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesPageRoutingModule
  ],
  declarations: [MesPage]
})
export class MesPageModule {}
