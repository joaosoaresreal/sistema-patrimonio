import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogAlteracaoPageRoutingModule } from './log-alteracao-routing.module';

import { LogAlteracaoPage } from './log-alteracao.page';
import { TransferePatrimonioService } from 'src/app/services/domain/TransferePatrimonio.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogAlteracaoPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [TransferePatrimonioService],
  declarations: [LogAlteracaoPage]
})
export class LogAlteracaoPageModule {}
