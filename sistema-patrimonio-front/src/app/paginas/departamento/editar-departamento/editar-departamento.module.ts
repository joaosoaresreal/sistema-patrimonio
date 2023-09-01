import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarDepartamentoPageRoutingModule } from './editar-departamento-routing.module';

import { EditarDepartamentoPage } from './editar-departamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarDepartamentoPageRoutingModule
  ],
  declarations: [EditarDepartamentoPage]
})
export class EditarDepartamentoPageModule {}
