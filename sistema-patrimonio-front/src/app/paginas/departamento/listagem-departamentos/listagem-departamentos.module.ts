import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemDepartamentosPageRoutingModule } from './listagem-departamentos-routing.module';

import { ListagemDepartamentosPage } from './listagem-departamentos.page';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemDepartamentosPageRoutingModule,
    SharedModule
  ],
  providers: [DepartamentoService],
  declarations: [ListagemDepartamentosPage]
})
export class ListagemDepartamentosPageModule {}
