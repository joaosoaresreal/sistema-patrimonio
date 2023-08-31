import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemDepartamentosPage } from './listagem-departamentos.page';

const routes: Routes = [
  {
    path: '',
    component: ListagemDepartamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagemDepartamentosPageRoutingModule {}
