import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarDepartamentoPageRoutingModule } from './editar-departamento-routing.module';

import { EditarDepartamentoPage } from './editar-departamento.page';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarDepartamentoPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DepartamentoService],
  declarations: [EditarDepartamentoPage]
})
export class EditarDepartamentoPageModule {}
