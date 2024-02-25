import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaixarPatrimonioPageRoutingModule } from './baixar-patrimonio-routing.module';

import { BaixarPatrimonioPage } from './baixar-patrimonio.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaixarPatrimonioPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [BaixarPatrimonioPage]
})
export class BaixarPatrimonioPageModule {}
