import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogAlteracaoPageRoutingModule } from './log-alteracao-routing.module';

import { LogAlteracaoPage } from './log-alteracao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogAlteracaoPageRoutingModule
  ],
  declarations: [LogAlteracaoPage]
})
export class LogAlteracaoPageModule {}
