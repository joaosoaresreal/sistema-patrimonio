import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';

@Component({
  selector: 'app-log-alteracao',
  templateUrl: './log-alteracao.page.html',
  styleUrls: ['./log-alteracao.page.scss'],
})

export class LogAlteracaoPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  plaquetaSelecionada!: string

  constructor(public nav: NavController, private route: ActivatedRoute, private alertController: AlertController, 
    private relatorioService: RelatorioService) { }

  emitir(){

    let dadosRelatorio = {
    //   'user': 'Usuário Teste',
    //   'deptoUser': 'Administrativo',
    //   'deptoRecebedor': this.depto,
    //   'plaqueta': this.transferenciaForm.value.plaqueta,
    //   'descricao': this.transferenciaForm.value.descricao,
    //   'estado': this.transferenciaForm.value.estado,
    //   'observacao': this.transferenciaForm.value.observacao,
    //   'data': dataAtual
    }

    this.relatorioService.gerarRelatorioTransferencia(dadosRelatorio).subscribe(
      response => {
        if (response.body) {
          const file = new Blob([response.body], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        } else {
          console.log('A resposta não possui um corpo');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  name: any;

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    
  }

  ngOnInit() {
  }

}
