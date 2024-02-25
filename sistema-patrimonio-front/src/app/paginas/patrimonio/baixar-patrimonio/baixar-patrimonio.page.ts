import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';
import { CpfValidator } from 'src/app/services/validators/CpfValidator';

@Component({
  selector: 'app-baixar-patrimonio',
  templateUrl: './baixar-patrimonio.page.html',
  styleUrls: ['./baixar-patrimonio.page.scss'],
})
export class BaixarPatrimonioPage implements OnInit {

  baixaForm!: FormGroup

  datepipe: DatePipe = new DatePipe('pt-BR')

  idPatrimonio!: number
  plaqueta = ''
  descricao = ''
  observacao: any
  cpfFormatado: any
  nomeFormatado: any

  constructor(private formBuilder: FormBuilder, public nav: NavController,
    private route: ActivatedRoute, private patrimonioService: PatrimonioService, private alerta: AlertsService,
    private relatorioService: RelatorioService) { }

  /********************************************************\
                  CANCELAMENTO DA BAIXA
  \********************************************************/
  cancelarBaixa() {
    this.alerta.alertaPadrao('Deseja cancelar a baixa do patrimônio?', 'SIM', 'NÃO', () => this.nav.navigateForward('listagem-patrimonios'), () => { })
  }

  /********************************************************\
            FORMATAR CPF COM PONTO E TRAÇO
  \********************************************************/
  validaCPF() {
    let formattedCpf = this.baixaForm.value.cpfProfissionalBaixa.replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4');
    this.cpfFormatado = formattedCpf
  }

  formataNome(){
    let nome = this.baixaForm.value.nomeProfissionalBaixa.toUpperCase()
    this.nomeFormatado = nome
  }

  /********************************************************\
                  CONFIRMANDO A BAIXA
  \********************************************************/
  submit() {
    if (this.baixaForm.invalid || this.baixaForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let dados = {
      'motivo': this.baixaForm.value.motivo,
      'nomeProfissionalBaixa': this.nomeFormatado,
      'cpfProfissionalBaixa': this.cpfFormatado,
      'usuarioBaixa': {
        'id': 1
      },
    }

    this.patrimonioService.baixa(this.idPatrimonio, dados).subscribe({
      next: (response) => this.gerarRelatorio(), // GERA O RELATÓRIO SE BAIXAR
      error: (error) => this.alerta.alertaOk('ERRO', 'Não foi possível efetivar a baixa, tente novamente ou entre em contato com o adiministrador do sistema',
        'error', 'OK', () => this.nav.navigateForward('listagem-patrimonios'))  // MENSAGEM CASO DE ERRO NA BAIXA
    })
  }

  /********************************************************\
                 GERA O RELATÓRIO E EXIBE
              AVISO NA TELA DE SUCESSO NA BAIXA
  \********************************************************/
  gerarRelatorio() {
    this.alerta.alertaOk('SUCESSO', 'O patrimônio foi baixado, aguarde a emissão do termo', 'success', 'OK', () => this.nav.navigateForward('listagem-patrimonios'))

    let dia = this.datepipe.transform(new Date(), 'd')
    let mes = this.datepipe.transform(new Date(), 'MMMM')
    let ano = this.datepipe.transform(new Date(), 'y')
    let dataAtual = dia + " de " + mes + " de " + ano // Formatando a data por extenso para fazer o relatório

    let dadosRelatorio = {
      "plaqueta": this.plaqueta,
      "descricao": this.descricao,
      "observacao": this.observacao,
      "motivo": this.baixaForm.value.motivo,
      "nomeProfissional": this.nomeFormatado,
      "cpfProfissional": this.cpfFormatado,
      "data": dataAtual
    }

    this.relatorioService.gerarRelatorioBaixa(dadosRelatorio).subscribe({
      next: (response) => {
        if (response.body) {
          const file = new Blob([response.body], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        } else {
          console.log('A resposta não possui um corpo');
        }
      }, error: (error) => this.alerta.alertaOk('ERRO', 'Não foi possível emitir o termo, tente reemiti-lo ou contate o administrador do sistema',
        'error', 'ok', () => this.nav.navigateForward('listagem-patrimonios'))
    })
  }

  /********************************************************\
                  AÇÕES DE INICIALIZAÇÃO
  \********************************************************/
  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.patrimonioService.findById(id).subscribe(response => {
      this.baixaForm = this.formBuilder.group({
        id: [response.id],
        plaqueta: [response.plaqueta],
        descricao: [response.descricao],

        motivo: ['', Validators.required],
        nomeProfissionalBaixa: ['', Validators.required],
        cpfProfissionalBaixa: ['', Validators.compose([Validators.required, CpfValidator.ValidaCpf])],
        usuarioBaixa: {
          id: ''
        },
      })

      this.idPatrimonio = response.id
      this.plaqueta = response.plaqueta
      this.descricao = response.descricao
      this.observacao = response.observacao
    })
  }

}
