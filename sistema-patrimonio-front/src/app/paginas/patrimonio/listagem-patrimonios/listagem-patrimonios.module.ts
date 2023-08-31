import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemPatrimoniosPageRoutingModule } from './listagem-patrimonios-routing.module';

import { ListagemPatrimoniosPage } from './listagem-patrimonios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemPatrimoniosPageRoutingModule
  ],
  declarations: [ListagemPatrimoniosPage]
})
export class ListagemPatrimoniosPageModule {}
