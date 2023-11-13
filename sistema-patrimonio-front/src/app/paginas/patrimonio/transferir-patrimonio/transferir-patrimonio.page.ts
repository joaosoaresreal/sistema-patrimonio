import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoDTO } from 'src/app/models/DepartamentoDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';
import { RelatorioService } from 'src/app/services/domain/Relatorio.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferir-patrimonio',
  templateUrl: './transferir-patrimonio.page.html',
  styleUrls: ['./transferir-patrimonio.page.scss'],
})
export class TransferirPatrimonioPage implements OnInit {

  transferenciaForm!: FormGroup
  departamentos!: DepartamentoDTO[]

  public datepipe: DatePipe = new DatePipe('pt-BR') 
  public data = ''
  public depto = ''

  constructor(private formBuilder: FormBuilder, public nav: NavController, private route: ActivatedRoute,
    private alertController: AlertController, 
    private patrimonioService: PatrimonioService,
    private departamentoService: DepartamentoService,
    private relatorioService: RelatorioService) { }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findAll().subscribe({next: (response)=>
      this.departamentos = response, 
      error: (error) => console.log(error)
  })
  }

  /********************************************************\
                    CANCELAR E VOLTAR 
  \********************************************************/
  async cancelar() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente cancelar a transferencia?',
      buttons: [
        {
          text: 'PROSSEGUIR',
          role: 'prosseguir',
          handler: () => {

          },
        },
        {
          text: 'CANCELAR',
          role: 'cancelar',
          handler: () => {
            this.nav.navigateForward('listagem-patrimonios')
          },
        },
      ],
    });

    await alert.present();

  }

/********************************************************\
                TERMO DE TRANSFERENCIA 
\********************************************************/
  submit() {
    // TRATANDO A DATA PARA SER RECEBIDA NO JSON
    let formattedDate = this.datepipe.transform(this.data, 'YYYY-MM-dd')

    let patrimonioEdit = {
      'id': this.transferenciaForm.value.id,
      'plaqueta': this.transferenciaForm.value.plaqueta,
      'descricao': this.transferenciaForm.value.descricao,
      'estado': this.transferenciaForm.value.estado,
      'localizacao': this.transferenciaForm.value.localizacao,
      'dataEntrada': formattedDate, // TRAZ A DATA COMO O JSON PRECISA RECEBER
      'observacao': this.transferenciaForm.value.observacao,
      'departamento':{
        'id': this.transferenciaForm.value.departamento,
      }
    }

    console.log(patrimonioEdit)

    this.patrimonioService.update(patrimonioEdit).subscribe({
      next: (response)=> this.gerarRelatorio(), // Se a requisição for ok, gere o relatório
      error: (error) => console.log(error)
    })
  }

  /* Aqui a requisição do relatório será enviada ao back */
  gerarRelatorio(){
    let dia = this.datepipe.transform(new Date(), 'd')
    let mes = this.datepipe.transform(new Date(), 'MMMM')
    let ano = this.datepipe.transform(new Date(), 'y')
    let dataAtual = dia + " de " + mes + " de " + ano // Formatando a data por extenso para fazer o relatório

    let dadosRelatorio = {
      'user': 'Usuário Teste',
      'deptoUser': 'Administrativo',
      'deptoRecebedor': this.depto,
      'plaqueta': this.transferenciaForm.value.plaqueta,
      'descricao': this.transferenciaForm.value.descricao,
      'estado': this.transferenciaForm.value.estado,
      'observacao': this.transferenciaForm.value.observacao,
      'data': dataAtual
    }

    this.alerta() // abrir o alerta enquanto o PDF é processado
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

  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.patrimonioService.findById(id).subscribe(response=>{
      this.transferenciaForm = this.formBuilder.group({
        id: [response.id],
        plaqueta: [response.plaqueta],
        descricao: [response.descricao],
        estado: [response.estado, Validators.required],
        localizacao: [response.localizacao, Validators.required],
        dataEntrada: [response.dataEntrada],
        observacao: [response.observacao],
        departamento: [response.departamento.id, Validators.required]
      })

      this.data = response.dataEntrada // PEGA A DATA SEM FORMATAÇÃO
      this.depto = response.departamento.nome // PEGA O NOME DO DPTO PARA INSERIR NO TERMO
    })
  }

  /********************************************************\
                    MENSAGEM PADRÃO 
  \********************************************************/
  alerta() {
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: 'SUCESSO',
      text: 'A transferência do patrimônio foi efetivada, o termo será aberto em outra janela',
      icon: 'success',
      confirmButtonText: 'OK',
      // Customizção
      confirmButtonColor: 'var(--ion-color-success-tint)',
      cancelButtonColor: 'var(--ion-color-danger-tint)',
      backdrop: `linear-gradient(#a24b7599 100%, transparent 555%)`
    }).then(() => {
      {
        this.nav.navigateForward('listagem-patrimonios')
      }
    })
  }

}
