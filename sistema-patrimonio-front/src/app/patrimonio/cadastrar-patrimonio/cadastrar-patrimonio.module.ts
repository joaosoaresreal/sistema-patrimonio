import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPatrimonioPageRoutingModule } from './cadastrar-patrimonio-routing.module';

import { CadastrarPatrimonioPage } from './cadastrar-patrimonio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPatrimonioPageRoutingModule
  ],
  declarations: [CadastrarPatrimonioPage]
})
export class CadastrarPatrimonioPageModule {}
