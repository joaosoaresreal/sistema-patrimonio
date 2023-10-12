import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarUsuarioPageRoutingModule } from './editar-usuario-routing.module';

import { EditarUsuarioPage } from './editar-usuario.page';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarUsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UsuarioService, DepartamentoService],
  declarations: [EditarUsuarioPage]
})
export class EditarUsuarioPageModule {}
