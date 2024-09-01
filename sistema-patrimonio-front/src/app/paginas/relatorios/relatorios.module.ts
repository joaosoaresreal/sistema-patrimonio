import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatoriosPageRoutingModule } from './relatorios-routing.module';

import { RelatoriosPage } from './relatorios.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatoriosPageRoutingModule,
    SharedModule
  ],
  providers: [DepartamentoService, RelatorioService],
  declarations: [RelatoriosPage]
})
export class RelatoriosPageModule {}
