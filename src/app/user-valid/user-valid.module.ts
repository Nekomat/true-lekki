import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserValidPageRoutingModule } from './user-valid-routing.module';

import { UserValidPage } from './user-valid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserValidPageRoutingModule
  ],
  declarations: [UserValidPage]
})
export class UserValidPageModule {}
