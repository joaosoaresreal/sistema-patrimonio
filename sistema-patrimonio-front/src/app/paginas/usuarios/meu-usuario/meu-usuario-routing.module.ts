import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeuUsuarioPage } from './meu-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: MeuUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeuUsuarioPageRoutingModule {}
