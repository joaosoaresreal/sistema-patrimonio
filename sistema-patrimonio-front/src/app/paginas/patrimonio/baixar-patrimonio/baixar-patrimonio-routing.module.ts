import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaixarPatrimonioPage } from './baixar-patrimonio.page';

const routes: Routes = [
  {
    path: '',
    component: BaixarPatrimonioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaixarPatrimonioPageRoutingModule {}
