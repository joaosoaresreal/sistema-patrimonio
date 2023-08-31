import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemUsuariosPage } from './listagem-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: ListagemUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagemUsuariosPageRoutingModule {}
