import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferirPatrimonioPageRoutingModule } from './transferir-patrimonio-routing.module';

import { TransferirPatrimonioPage } from './transferir-patrimonio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferirPatrimonioPageRoutingModule
  ],
  declarations: [TransferirPatrimonioPage]
})
export class TransferirPatrimonioPageModule {}
