import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarDepartamentoPageRoutingModule } from './cadastrar-departamento-routing.module';

import { CadastrarDepartamentoPage } from './cadastrar-departamento.page';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarDepartamentoPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DepartamentoService],
  declarations: [CadastrarDepartamentoPage]
})
export class CadastrarDepartamentoPageModule {}
