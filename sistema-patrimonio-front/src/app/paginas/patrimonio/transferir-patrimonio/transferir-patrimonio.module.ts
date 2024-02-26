import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferirPatrimonioPageRoutingModule } from './transferir-patrimonio-routing.module';

import { TransferirPatrimonioPage } from './transferir-patrimonio.page';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferirPatrimonioPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DepartamentoService, RelatorioService],
  declarations: [TransferirPatrimonioPage]
})
export class TransferirPatrimonioPageModule {}
