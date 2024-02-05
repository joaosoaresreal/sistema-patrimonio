import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarUsuarioPageRoutingModule } from './cadastrar-usuario-routing.module';

import { CadastrarUsuarioPage } from './cadastrar-usuario.page';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarUsuarioPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [UsuarioService, DepartamentoService],
  declarations: [CadastrarUsuarioPage]
})
export class CadastrarUsuarioPageModule {}
