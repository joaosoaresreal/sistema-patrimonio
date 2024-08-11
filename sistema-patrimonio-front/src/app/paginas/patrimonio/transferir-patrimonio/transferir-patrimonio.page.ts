import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';
import { DatePipe } from '@angular/common';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DepartamentoNomeDTO } from 'src/app/models/DepartamentoNomeDTO';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';
import { DadosUser } from 'src/app/services/domain/user/DadosUser';

@Component({
  selector: 'app-transferir-patrimonio',
  templateUrl: './transferir-patrimonio.page.html',
  styleUrls: ['./transferir-patrimonio.page.scss'],
})
export class TransferirPatrimonioPage implements OnInit {

  transferenciaForm!: FormGroup
  departamentos!: DepartamentoNomeDTO[]

  datepipe: DatePipe = new DatePipe('pt-BR')
  data = ''
  depto = ''

  deptoAnterior!: number
  deptoAnteriorNome = ''
  plaqueta = ''
  estado = ''
  descricao = ''
  observacao = ''
  nomeUsuario: any;
  deptoUsuario: any;

  constructor(private formBuilder: FormBuilder, public nav: NavController, private route: ActivatedRoute,
    private patrimonioService: PatrimonioService,
    private departamentoService: DepartamentoService,
    private authService: AuthenticationService,
    private dados: DadosUser,
    private relatorioService: RelatorioService,
    private alerta: AlertsService) { }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findByNomeSQL().subscribe({
      next: (response) =>
        this.departamentos = response,
      error: (error) => console.log(error)
    })
  }

  /********************************************************\
                    CANCELAR E VOLTAR 
  \********************************************************/
  cancelar(){
    this.alerta.alertaPadrao('Deseja realmente cancelar a transferencia?', 'SIM', 'NÃO', 
      () => this.nav.navigateForward('listagem-patrimonios'), () => {})
  }

  /********************************************************\
                 EFETIVAÇÃO DE TRANSFERENCIA 
  \********************************************************/
  submit() {
    let patrimonioEdit = {
      'id': this.transferenciaForm.value.id,
      'deptoTransferencia': {
        'id': this.transferenciaForm.value.departamento
      },
      'usuarioTransferencia': {
        'id': this.authService.dadosUsuario().idUsuario
      }
    }

    this.departamentoService.findById(this.transferenciaForm.value.departamento).subscribe({
      next: (response) => {
        this.depto = response.nome
      }, error: (error) => console.log(error)
    })

    if (this.transferenciaForm.value.departamento === '') { // VERIFICA SE O DPTO FOI PREENCHIDO
      this.alerta.alertaOk('', 'Para efetivar a transferência o departamento recebedor deve ser informado', 'info', 'OK')
    }
    else if (this.transferenciaForm.value.departamento == this.deptoAnterior) { // VERIFICA SE O DPTO NÃO É O MESMO QUE O PATRIMONIO JÁ ESTÁ
      this.alerta.alertaOk('', 'Para efetivar a transferência o departamento recebedor deve ser diferente do atual',
        'warning', 'OK')
    } else { // SE O DPTO FOR PREENCHIDO E FOR DIFERENTE DO ANTERIOR, PROSSIGA
      this.patrimonioService.transferencia(patrimonioEdit.id, patrimonioEdit).subscribe({
        next: (response) => this.gerarRelatorio(), // Se a requisição for ok, gere o relatório
        error: (error) => this.alerta.alertaOk('ERRO', 'Não foi possível efetivar a transferencia do patrimônio, tente novamente mais tarde, ou contate o administrador do sistema',
          'error', 'ok', () => this.nav.navigateForward('listagem-patrimonios'))
      });
    }
  }

  /********************************************************\
                  TERMO DE TRANSFERENCIA 
  \********************************************************/
  gerarRelatorio() {
    this.alerta.alertaOk('SUCESSO', 'A transferência do patrimônio foi efetivada, o termo será aberto em outra janela',
      'success', 'OK', () => this.nav.navigateForward('listagem-patrimonios')) // abrir o alerta enquanto o PDF é processado

    let dia = this.datepipe.transform(new Date(), 'd')
    let mes = this.datepipe.transform(new Date(), 'MMMM')
    let ano = this.datepipe.transform(new Date(), 'y')
    let dataAtual = dia + " de " + mes + " de " + ano // Formatando a data por extenso para fazer o relatório

    let dadosRelatorio = {
      'user': this.nomeUsuario,
      'deptoUser': this.deptoUsuario,
      'deptoRecebedor': this.depto,
      'plaqueta': this.transferenciaForm.value.plaqueta,
      'descricao': this.transferenciaForm.value.descricao,
      'estado': this.transferenciaForm.value.estado,
      'observacao': this.transferenciaForm.value.observacao,
      'data': dataAtual
    }

    this.relatorioService.gerarRelatorioTransferencia(dadosRelatorio).subscribe({
      next: (response) => {
        if (response.body) {
          const file = new Blob([response.body], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        } else {
          this.alerta.alertaOk('ERRO', 'Não foi possível emitir o termo, tente reemiti-lo ou contate o administrador do sistema',
            'error', 'ok', () => this.nav.navigateForward('listagem-patrimonios'))
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.patrimonioService.findById(id).subscribe(response => {
      this.transferenciaForm = this.formBuilder.group({
        id: [response.id],
        plaqueta: [response.plaqueta],
        descricao: [response.descricao],
        estado: [response.estado],
        localizacao: [response.localizacao],
        dataEntrada: [response.dataEntrada],
        observacao: [response.observacao],
        departamento: ['', Validators.required]
      })

      this.data = response.dataEntrada // PEGA A DATA SEM FORMATAÇÃO
      this.deptoAnterior = response.departamento.id // PEGA O ID PRA COMPARAR COM O NOVO
      this.deptoAnteriorNome = response.departamento.nome // PEGA O NOME DO DPTO PARA FAZER VALIDAÇÃO
      this.plaqueta = response.plaqueta
      this.estado = response.estado
      this.descricao = response.descricao
      this.observacao = response.observacao
    })

    this.dados.dadosUsuarioAPI().subscribe(data=>{
      this.nomeUsuario = data.nome,
      this.deptoUsuario = data.deptoNome
    })
  }
}
