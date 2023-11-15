import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogAlteracaoPage } from './log-alteracao.page';

const routes: Routes = [
  {
    path: '',
    component: LogAlteracaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogAlteracaoPageRoutingModule {}
