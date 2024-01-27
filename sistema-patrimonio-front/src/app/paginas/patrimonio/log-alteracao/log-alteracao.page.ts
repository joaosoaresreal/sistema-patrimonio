import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { TransferePatrimonioDTO } from 'src/app/models/TransferePatrimonioDTO';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';
import { TransferePatrimonioService } from 'src/app/services/domain/TransferePatrimonio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-alteracao',
  templateUrl: './log-alteracao.page.html',
  styleUrls: ['./log-alteracao.page.scss'],
})

export class LogAlteracaoPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  logForm!: FormGroup
  patrimonios!: TransferePatrimonioDTO[]

  public datepipe: DatePipe = new DatePipe('pt-BR')

  isModalOpen = false;
  plaqueta: any;
  dataHora: any;
  dataRelatorio: any;
  dadosRelatorio: any = [];

  constructor(public nav: NavController, private formBuilder: FormBuilder, private route: ActivatedRoute, private alertController: AlertController,
    private relatorioService: RelatorioService, private transferePatrimonioService: TransferePatrimonioService) { }

  /*********************************************************************\
                FORMATA A PLAQUETA INSERIDA PARA UPPERCASE
  \*********************************************************************/
  plaquetaSelecionada() {
    let plaquetaInserida = this.logForm.value.plaqueta.toUpperCase()
    this.logForm.get('plaqueta')?.setValue(plaquetaInserida)
    this.plaqueta = plaquetaInserida
  }

  /*********************************************************************\
                  BUSCA A PLAQUETA NA TABELA DE TRANSFERENCIA
  \*********************************************************************/
  submit() {
    this.transferePatrimonioService.findByPlaqueta(this.plaqueta).subscribe((response) => {
      if (response.length >= 1) { // Se tiver resultados vai abrir o modal
        this.patrimonios = response // Resposta da API
        // Formatando a data para exibir na UI
        this.patrimonios.forEach(patrimonio => {
          if (patrimonio.dataHoraModificacao) {
            const dataArray = patrimonio.dataHoraModificacao;
            const data = new Date(dataArray[0], dataArray[1] - 1, dataArray[2], dataArray[3], dataArray[4], dataArray[5], dataArray[6]);
            this.dataHora = this.datepipe.transform(data, 'dd/MM/yyyy hh:mm')
          }
        });
        this.isModalOpen = true; // Abre o modal
      } else { // Senão abre o aviso de que não existe dados dessa plaqueta
        this.alertaPlaqueta()
      }
    })
  }

  /*********************************************************************\
                          REEMITIR O TERMO
  \*********************************************************************/
  emitir(id: any) {
    this.transferePatrimonioService.findById(id).subscribe(response => {
      // Formatando a data
      const valores = response.dataHoraModificacao
      if (valores.length >= 7) {
        const data = new Date(
          valores[0], // Ano
          valores[1] - 1, // Mes
          valores[2], // dDa
        )
        let dia = this.datepipe.transform(data, 'd')
        let mes = this.datepipe.transform(data, 'MMMM')
        let ano = this.datepipe.transform(data, 'y')
        this.dataRelatorio = dia + " de " + mes + " de " + ano // Formatando a data por extenso para fazer o relatório
      }

      // Pegando os dados necessários para gerar o termo
      this.dadosRelatorio = {
        'user': 'Usuário Teste',
        'deptoUser': response.deptoAnterior,
        'deptoRecebedor': response.deptoTransferencia.nome,
        'plaqueta': response.plaqueta,
        'descricao': response.patrimonio.descricao,
        'estado': response.patrimonio.estado,
        'observacao': response.obsAnterior,
        'data': this.dataRelatorio
      };

      // abrir o alerta enquanto o PDF é processado
      Swal.fire({
        heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
        allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
        title: 'SUCESSO',
        text: 'O termo está sendo processado e será aberto em outra janela',
        icon: 'success',
        confirmButtonText: 'OK',
        // Customizção
        confirmButtonColor: 'var(--ion-color-success-tint)',
        cancelButtonColor: 'var(--ion-color-danger-tint)',
        backdrop: `linear-gradient(#a24b7599 100%, transparent 555%)`
      })

      // Enviar a requisição de relatório ao back-end e retornar o PDF do termo ao usuário
      this.relatorioService.gerarRelatorioTransferencia(this.dadosRelatorio).subscribe(
        relatorioResponse => {
          if (relatorioResponse.body) {
            const file = new Blob([relatorioResponse.body], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
          } else {
            console.log('A resposta do relatório não possui um corpo');
          }
        },
        error => {
          console.log('Erro ao gerar relatório:', error);
        }
      );
    });
  }

  // Sair do modal
  confirm() {
    this.isModalOpen = false;
  }

  /* Botão de listagem patrimonial */
  async listagem() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente sair desta página?',
      buttons: [
        {
          text: 'SIM',
          handler: () => {
            this.nav.navigateForward('listagem-patrimonios')
          },
        },
        {
          text: 'NÃO',
          handler: () => { },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      plaqueta: ['']
    })
  }

  // Alerta que não existe a plaqueta buscada
  alertaPlaqueta() {
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: 'ATENÇÃO',
      text: 'A plaqueta inserida não possui nenhum registro de transferência',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'FAZER OUTRA PESQUISA',
      cancelButtonText: 'VOLTAR A LISTAGEM',
      // Customizção
      confirmButtonColor: 'var(--ion-color-success-tint)',
      cancelButtonColor: 'var(--ion-color-danger-tint)',
      backdrop: `linear-gradient(#a24b7599 100%, transparent 555%)`
    }).then((result) => {
      if (result.isConfirmed) { // Se o resultado for 'SIM', faça isso

      } else if (
        result.dismiss === Swal.DismissReason.cancel // Se o resultado for 'NÃO', faça isso
      ) {
        this.nav.navigateForward('listagem-patrimonios')
      }
    })
  }

}
