import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemUsuariosPageRoutingModule } from './listagem-usuarios-routing.module';

import { ListagemUsuariosPage } from './listagem-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemUsuariosPageRoutingModule
  ],
  declarations: [ListagemUsuariosPage]
})
export class ListagemUsuariosPageModule {}
