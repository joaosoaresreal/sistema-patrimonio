import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPatrimonioPageRoutingModule } from './editar-patrimonio-routing.module';

import { EditarPatrimonioPage } from './editar-patrimonio.page';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPatrimonioPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DepartamentoService],
  declarations: [EditarPatrimonioPage]
})
export class EditarPatrimonioPageModule {}
