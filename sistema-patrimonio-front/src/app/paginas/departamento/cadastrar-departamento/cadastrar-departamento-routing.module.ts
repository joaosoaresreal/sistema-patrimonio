import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarDepartamentoPage } from './cadastrar-departamento.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarDepartamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarDepartamentoPageRoutingModule {}
