import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPatrimonioPage } from './editar-patrimonio.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPatrimonioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPatrimonioPageRoutingModule {}
