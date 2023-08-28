import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarDepartamentoPageRoutingModule } from './cadastrar-departamento-routing.module';

import { CadastrarDepartamentoPage } from './cadastrar-departamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarDepartamentoPageRoutingModule
  ],
  declarations: [CadastrarDepartamentoPage]
})
export class CadastrarDepartamentoPageModule {}
