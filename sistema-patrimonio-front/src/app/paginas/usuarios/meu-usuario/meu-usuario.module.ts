import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeuUsuarioPageRoutingModule } from './meu-usuario-routing.module';

import { MeuUsuarioPage } from './meu-usuario.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeuUsuarioPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [MeuUsuarioPage]
})
export class MeuUsuarioPageModule {}
