import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPatrimonioPageRoutingModule } from './editar-patrimonio-routing.module';

import { EditarPatrimonioPage } from './editar-patrimonio.page';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPatrimonioPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DepartamentoService],
  declarations: [EditarPatrimonioPage]
})
export class EditarPatrimonioPageModule {}
