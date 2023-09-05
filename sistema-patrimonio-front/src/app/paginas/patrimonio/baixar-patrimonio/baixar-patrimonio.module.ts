import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaixarPatrimonioPageRoutingModule } from './baixar-patrimonio-routing.module';

import { BaixarPatrimonioPage } from './baixar-patrimonio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaixarPatrimonioPageRoutingModule
  ],
  declarations: [BaixarPatrimonioPage]
})
export class BaixarPatrimonioPageModule {}
