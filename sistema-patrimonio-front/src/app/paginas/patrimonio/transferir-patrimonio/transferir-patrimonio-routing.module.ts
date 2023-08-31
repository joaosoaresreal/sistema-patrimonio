import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferirPatrimonioPage } from './transferir-patrimonio.page';

const routes: Routes = [
  {
    path: '',
    component: TransferirPatrimonioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferirPatrimonioPageRoutingModule {}
