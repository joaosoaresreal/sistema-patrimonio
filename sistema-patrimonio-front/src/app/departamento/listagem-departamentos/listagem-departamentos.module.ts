import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemDepartamentosPageRoutingModule } from './listagem-departamentos-routing.module';

import { ListagemDepartamentosPage } from './listagem-departamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemDepartamentosPageRoutingModule
  ],
  declarations: [ListagemDepartamentosPage]
})
export class ListagemDepartamentosPageModule {}
