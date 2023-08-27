import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarPatrimonioPage } from './cadastrar-patrimonio.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarPatrimonioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarPatrimonioPageRoutingModule {}
