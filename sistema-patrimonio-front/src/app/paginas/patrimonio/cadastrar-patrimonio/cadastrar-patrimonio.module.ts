import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPatrimonioPageRoutingModule } from './cadastrar-patrimonio-routing.module';

import { CadastrarPatrimonioPage } from './cadastrar-patrimonio.page';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPatrimonioPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DepartamentoService],
  declarations: [CadastrarPatrimonioPage],
})
export class CadastrarPatrimonioPageModule {}
