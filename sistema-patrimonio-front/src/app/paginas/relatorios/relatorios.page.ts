import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DepartamentoNomeDTO } from 'src/app/models/DepartamentoNomeDTO';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';
import { DadosUser } from 'src/app/services/domain/user/DadosUser';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
})
export class RelatoriosPage implements OnInit {

  departamentos!: DepartamentoNomeDTO[]

  selectedValue: any;
  deptoSelecionado: any; // depto selecionado para consulta de patrimonios
  deptoBaixa: any; // depto selecionado para consulta da baixa
  deptoUser: any;
  deptoUserId: any;

  loading: any;

  constructor(
    private relatorioService: RelatorioService,
    private departamentoService: DepartamentoService,
    protected auth: AuthenticationService,
    private dados: DadosUser,
    private alerta: AlertsService,
    private loadingControler: LoadingController
  ) { }

  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findByNomeSQL().subscribe({
      next: (response) =>
        this.departamentos = response,
      error: (error) => console.log(error)
    })
  }

  /********************************************************\
            FUNÇÃO QUE VERIFICA QUAL O RELATORIO 
  \********************************************************/
  async gerar() {
    this.loading = await this.loadingControler.create({
      message: 'Gerando o relatório...',
      spinner: 'circles'
    })
    await this.loading.present();

    // caso não tenha selecionado nenhuma opção
    if(this.selectedValue == null || undefined){
      this.loading.dismiss();
      this.alerta.alertaAtencao('ATENÇÃO', 'Deve ser selecionado uma opção de relatório a ser gerado', 'error', false, 'OK')
    }

    // opção escolhida
    switch (this.selectedValue) {
      case 'geral':
        this.geral()
        break;
      case 'porDepto':
        this.porDepto(this.deptoSelecionado)
        break;
      case 'meuDepto':
        this.porDepto(this.deptoUserId) // usa o mesmo caso do porDepto mais ja setando o Depto do Usuario Logado...
        break;
      case 'baixaGeral':
        this.baixaGeral()
        break;
      case 'baixaDepto':
        this.baixaDepto(this.deptoBaixa)
        break;
      case 'baixaMeuDepto':
        this.baixaDepto(this.deptoUserId)
        break;

    }
  }


  /********************************************************\
  FUNÇÃO QUE EMITE RELATORIO DE PATRIMONIOS GERAIS -- ATIVOS
  \********************************************************/
  geral() {
    this.relatorioService.gerarRelatorioPatrimonioGeral().subscribe({
      next: (response) => {
        this.abrePdf(response)
      },
      error: (error) => {
        this.erro()
      }
    });
  }

  /********************************************************\
      FUNÇÃO QUE EMITE RELATORIO DE PATRIMONIOS POR DEPTO
  \********************************************************/
  porDepto(depto: any){
    if(depto == null){
      this.loading.dismiss();

      this.alerta.alertaAtencao('', 'Para emitir o relatorio deve ser informado o departamento',
        'warning', false, 'OK')
    } else{
      this.relatorioService.gerarRelatorioPatrimonioDepto(depto).subscribe({
        next: (response) => {
          this.abrePdf(response)
        },
        error: (error) => {
          this.erro()
        }
      });
    }
  }

  /********************************************************\
      FUNÇÃO QUE EMITE RELATORIO DE PATRIMONIOS BAIXADOS
  \********************************************************/
  baixaGeral(){
    this.relatorioService.gerarRelatorioBaixaGeral().subscribe({
      next: (response) => {
        this.abrePdf(response)
      },
      error: (error) => {
        this.erro()
      }
    });
  }

  /********************************************************\
      FUNÇÃO QUE EMITE RELATORIO DE BAIXAS POR DEPTO
  \********************************************************/
  baixaDepto(id: any){
    if(id == null){
      this.loading.dismiss();

      this.alerta.alertaAtencao('', 'Para emitir o relatorio deve ser informado o departamento',
        'warning', false, 'OK')
    } else{
      this.relatorioService.gerarRelatorioBaixaDepto(id).subscribe({
        next: (response) => {
          this.abrePdf(response)
        },
        error: (error) => {
          this.erro()
        }
      });
    }
  }

  /********************************************************\
              FUNÇÃO QUE ABRE O RELATORIO
  \********************************************************/
  abrePdf(response: any){
    if(response.body){
      this.loading.dismiss(); // Esconde o loading quando a resposta for recebida
  
      const file = new Blob([response.body], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  }

  /********************************************************\
        FUNÇÃO QUE EMITE MENSAGEM EM CASO DE ERRO
  \********************************************************/
  erro(){
    this.loading.dismiss(); // Esconde o loading em caso de erro
    this.alerta.alertaOk('ERRO', 'Não foi possível emitir o relatorio selecionado, tente novamente mais tarde, ou contate o administrador do sistema',
      'error', 'OK')
  }

  ngOnInit() {
    this.dados.dadosUsuarioAPI().subscribe(data => {
      this.deptoUser = data.deptoNome,
      this.deptoUserId = data.deptoId
    });
  }

}
