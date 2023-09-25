import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarUsuarioPageRoutingModule } from './cadastrar-usuario-routing.module';

import { CadastrarUsuarioPage } from './cadastrar-usuario.page';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarUsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UsuarioService],
  declarations: [CadastrarUsuarioPage]
})
export class CadastrarUsuarioPageModule {}
