import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';
import { CpfValidator } from 'src/app/services/validators/CpfValidator';

@Component({
  selector: 'app-baixar-patrimonio',
  templateUrl: './baixar-patrimonio.page.html',
  styleUrls: ['./baixar-patrimonio.page.scss'],
})
export class BaixarPatrimonioPage implements OnInit {

  baixaForm!: FormGroup

  idPatrimonio!: number
  plaqueta = ''
  descricao = ''
  cpfFormatado: any

  constructor(private formBuilder: FormBuilder, public nav: NavController,
    private route: ActivatedRoute, private patrimonioService: PatrimonioService, private alerta: AlertsService) { }

  /********************************************************\
                  CANCELAMENTO DA BAIXA
  \********************************************************/
  cancelarBaixa() {
      this.alerta.alertaPadrao('Deseja cancelar a baixa do patrimônio?', 'SIM', 'NÃO', () => this.nav.navigateForward('listagem-patrimonios'), () => {})
  }

  /********************************************************\
            FORMATAR CPF COM PONTO E TRAÇO
  \********************************************************/
  validaCPF(){
    let formattedCpf = this.baixaForm.value.cpfProfissionalBaixa.replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4');
    this.cpfFormatado = formattedCpf
  }

  /********************************************************\
                  CONFIRMANDO A BAIXA
  \********************************************************/
  submit() {
    if(this.baixaForm.invalid || this.baixaForm.pending){
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let dados = {
      'motivo': this.baixaForm.value.motivo,
      'nomeProfissionalBaixa': this.baixaForm.value.nomeProfissionalBaixa,
      'cpfProfissionalBaixa': this.cpfFormatado,
      'usuarioBaixa': {
        'id': 1
      },
    }

    this.patrimonioService.baixa(this.idPatrimonio, dados).subscribe({
      next: (response) => this.gerarRelatorio(), // GERA O RELATÓRIO SE BAIXAR
      error: (error) => this.alerta.alertaOk('ERRO', 'Não foi possível efetivar a baixa, tente novamente ou entre em contato com o adiministrador do sistema',
       'error', 'OK', ()=> this.nav.navigateForward('listagem-patrimonios'))  // MENSAGEM CASO DE ERRO NA BAIXA
    })
  }

  /********************************************************\
                 GERA O RELATÓRIO E EXIBE
              AVISO NA TELA DE SUCESSO NA BAIXA
  \********************************************************/
  gerarRelatorio(){
    this.alerta.alertaOk('SUCESSO', 'O patrimônio foi baixado, aguarde a emissão do termo', 'sucess', 'OK', ()=> this.nav.navigateForward('listagem-patrimonios'))
  }



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
    })
  }

}
