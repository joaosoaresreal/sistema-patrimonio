import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemPatrimoniosPageRoutingModule } from './listagem-patrimonios-routing.module';

import { ListagemPatrimoniosPage } from './listagem-patrimonios.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemPatrimoniosPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ListagemPatrimoniosPage]
})
export class ListagemPatrimoniosPageModule {}
