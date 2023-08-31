import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemPatrimoniosPage } from './listagem-patrimonios.page';

const routes: Routes = [
  {
    path: '',
    component: ListagemPatrimoniosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagemPatrimoniosPageRoutingModule {}
