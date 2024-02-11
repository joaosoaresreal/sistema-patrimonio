import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal, NavController } from '@ionic/angular';
import { TransferePatrimonioDTO } from 'src/app/models/TransferePatrimonioDTO';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';
import { TransferePatrimonioService } from 'src/app/services/domain/TransferePatrimonio.service';

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
  startDate: any;
  endDate: any;
  dataHora: any;
  dataRelatorio: any;
  dadosRelatorio: any = [];

  dataInicialFormat: any;
  dataFinalFormat: any;
  toolbarTitulo: any;

  constructor(public nav: NavController, private formBuilder: FormBuilder, private relatorioService: RelatorioService,
    private transferePatrimonioService: TransferePatrimonioService, private alerta: AlertsService) { }

  /*********************************************************************\
                FORMATA A PLAQUETA INSERIDA PARA UPPERCASE
  \*********************************************************************/
  plaquetaSelecionada() {
    let plaquetaInserida = this.logForm.value.plaqueta.toUpperCase()
    this.logForm.get('plaqueta')?.setValue(plaquetaInserida)
    this.plaqueta = plaquetaInserida.trim()
  }

  /*********************************************************************\
                    VALIDA O QUE FOI PREENCHIDO
  \*********************************************************************/
  submit() {
    this.startDate = this.logForm.value.startDate
    this.endDate = this.logForm.value.endDate

    this.dataInicialFormat = this.datepipe.transform(this.startDate, 'yyyy-MM-dd')
    this.dataFinalFormat = this.datepipe.transform(this.endDate, 'yyyy-MM-dd')

    if (this.startDate != '' && this.endDate != '' && this.plaqueta != '') { // SE preencher TODOS os campos
      this.buscaCompleta()
    }
    else if (this.startDate != '' || this.endDate != '' && this.plaqueta == '') { // se um dos campos estiver preenchido, menos a plaqueta vai pela data
      this.buscaData()
    }
    else if (this.plaqueta != '' && this.startDate == '' && this.endDate == '') { // Se inserir SOMENTE a plaqueta vai nessa condição
      this.buscaPlaqueta()
    }
    else { // Se apertar o botão sem inserir nada vai nessa condição
      this.alerta.alertaAtencao('ATENÇÃO', 'Deve ser informado algum parametro de busca, como Plaqueta ou um periodo entre Datas ou ambas as opções',
        'info', false, 'OK')
    }
  }

  buscaCompleta() {
    this.transferePatrimonioService.findByPlaquetaDataHoraModificacao(this.plaqueta, this.dataInicialFormat, this.dataFinalFormat).subscribe((response) => {
      this.processResponse(response, () => this.alerta.alertaAtencao('ATENÇÃO', 'Não há dados para a plaqueta e periodo informado', 'warning', true, 'FAZER OUTRA PESQUISA',
        'VOLTAR A LISTAGEM', () => this.nav.navigateForward('listagem-patrimonios')))
    })
    this.toolbarTitulo = `Plaqueta: ${this.plaqueta} e Periodo de ${this.datepipe.transform(this.startDate, 'dd/MM/yyyy')} a ${this.datepipe.transform(this.endDate, 'dd/MM/yyyy')}`
  }

  buscaData() {
    if (this.startDate === '' || this.endDate === '') { // Valida se os dois campos estao preenchidos
      this.alerta.alertaAtencao('ATENÇÃO', 'Informe a data inicial e final, ou o número da plaqueta', 'info', false, 'OK')
    } else if (this.startDate != '' && this.endDate != '') { // Se inserir a data nos dois campos vai nessa condição
      this.transferePatrimonioService.findByDataHoraModificacaoBetween(this.dataInicialFormat, this.dataFinalFormat).subscribe((response) => {
        this.processResponse(response, () => this.alerta.alertaAtencao('ATENÇÃO', 'Não há dados para o periodo informado', 'warning', true, 'FAZER OUTRA PESQUISA',
          'VOLTAR A LISTAGEM', () => this.nav.navigateForward('listagem-patrimonios')))
      })
    }
    this.toolbarTitulo = `Período: ${this.datepipe.transform(this.startDate, 'dd/MM/yyyy')} a ${this.datepipe.transform(this.endDate, 'dd/MM/yyyy')}`
  }

  buscaPlaqueta() {
    this.transferePatrimonioService.findByPlaqueta(this.plaqueta).subscribe((response) => {
      this.processResponse(response, () => this.alerta.alertaAtencao('ATENÇÃO', 'A plaqueta inserida não possui nenhum registro de transferência', 'warning', true,
        'FAZER OUTRA PESQUISA', 'VOLTAR A LISTAGEM', () => this.nav.navigateForward('listagem-patrimonios')))
    })
    this.toolbarTitulo = `Plaqueta: ${this.plaqueta}`
  }

  /***************** RESPOSTA DA API *****************/
  processResponse(response: any, alertaModal: any) {
    if (response.length >= 1) { // Se tiver resultados vai abrir o modal
      this.patrimonios = response; // Resposta da API

      // Formatando a data para exibir na UI
      this.patrimonios.forEach(patrimonio => {
        if (patrimonio.dataHoraModificacao) {
          // console.log("BACK: " + patrimonio.dataHoraModificacao)
          // console.log("TIPO: " + typeof patrimonio.dataHoraModificacao)
          const dataArray = patrimonio.dataHoraModificacao
          const data = new Date(dataArray[0], dataArray[1] - 1, dataArray[2], dataArray[3], dataArray[4], dataArray[5], dataArray[6]);
          this.dataHora = this.datepipe.transform(data, 'dd/MM/yyyy hh:mm');
          patrimonio.dataHoraModificacao = this.dataHora;
          // console.log(data)
        }
      });
      // console.log("FRONT: " + this.dataHora)
      this.isModalOpen = true; // Abre o modal
    } else { // Senão abre o aviso personalizado para cada opção
      alertaModal()
    }
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
      this.alerta.alertaAtencao('SUCESSO', 'O termo está sendo processado e será aberto em outra janela', 'success', false, 'OK')

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
  listagem() {
    this.alerta.alertaPadrao('Deseja realmente sair desta página?', 'SIM', 'NÃO', () => this.nav.navigateForward('listagem-patrimonios'), () => { })
  }

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      plaqueta: [''],
      startDate: [''],
      endDate: ['']
    })
  }

}
