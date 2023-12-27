import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Welcome1PageRoutingModule } from './welcome1-routing.module';

import { Welcome1Page } from './welcome1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Welcome1PageRoutingModule
  ],
  declarations: [Welcome1Page]
})
export class Welcome1PageModule {}
