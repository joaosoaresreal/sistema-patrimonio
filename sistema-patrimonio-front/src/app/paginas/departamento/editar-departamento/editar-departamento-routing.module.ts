import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarDepartamentoPage } from './editar-departamento.page';

const routes: Routes = [
  {
    path: '',
    component: EditarDepartamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarDepartamentoPageRoutingModule {}
