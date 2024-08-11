import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeuUsuarioPageRoutingModule } from './meu-usuario-routing.module';

import { MeuUsuarioPage } from './meu-usuario.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeuUsuarioPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [UsuarioService],
  declarations: [MeuUsuarioPage]
})
export class MeuUsuarioPageModule {}
