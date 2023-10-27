import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoNomeDTO } from 'src/app/models/DepartamentoNomeDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';

@Component({
  selector: 'app-editar-patrimonio',
  templateUrl: './editar-patrimonio.page.html',
  styleUrls: ['./editar-patrimonio.page.scss'],
})
export class EditarPatrimonioPage implements OnInit {

  editarPatrimonioForm!: FormGroup
  departamentos!: DepartamentoNomeDTO[]

  public data = ''
  public depto = ''

  public checked = false
  public disabled = true

  constructor(private formBuilder: FormBuilder, private patrimonioService: PatrimonioService, private route: ActivatedRoute,
    private departamentoService: DepartamentoService, private alertController: AlertController, public nav: NavController) { }

  /********************************************************\
                  SALVAR EDIÇÃO
  \********************************************************/
  submit() {
    if (this.editarPatrimonioForm.invalid || this.editarPatrimonioForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    // TRATANDO A DATA PARA SER RECEBIDA NO JSON
    const datepipe: DatePipe = new DatePipe('pt-BR') 
    let formattedDate = datepipe.transform(this.data, 'YYYY-MM-dd')

    let patrimonioEdit = {
      'id': this.editarPatrimonioForm.value.id,
      'plaqueta': this.editarPatrimonioForm.value.plaqueta,
      'descricao': this.editarPatrimonioForm.value.descricao,
      'estado': this.editarPatrimonioForm.value.estado,
      'localizacao': this.editarPatrimonioForm.value.localizacao,
      'dataEntrada': formattedDate, // TRAZ A DATA COMO O JSON PRECISA RECEBER
      'observacao': this.editarPatrimonioForm.value.observacao,
      'departamento':{
        'id': this.editarPatrimonioForm.value.departamento,
      }
    }

    console.log(patrimonioEdit)

    this.patrimonioService.update(patrimonioEdit).subscribe({
      next: (response)=> this.alerta('Patrimônio alterado com sucesso', 'OK', () => { this.nav.navigateForward('listagem-patrimonios') }),
      error: (error) => console.log(error)
    })
  }

  clicou(event: any) { // ATIVA O BOTÃO DE SALVAR A EDIÇÃO
    if(event.detail.checked === true) {
      this.disabled = false

      console.log(this.depto)
    }else if(event.detail.checked === false){
      this.disabled = true
    }
  }

  /********************************************************\
                  CANCELAR EDIÇÃO 
  \********************************************************/
  async cancelar() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente descartar as alterações?',
      buttons: [
        {
          text: 'SIM',
          handler: () => {
            this.nav.navigateForward('listagem-patrimonios')
          },
        },
        {
          text: 'NÃO',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }


  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.patrimonioService.findById(id).subscribe(response => {
      this.editarPatrimonioForm = this.formBuilder.group({
        id: [response.id],
        plaqueta: [response.plaqueta, Validators.required],
        descricao: [response.descricao, Validators.required],
        estado: [response.estado, Validators.required],
        localizacao: [response.localizacao, Validators.required],
        dataEntrada: [response.dataEntrada],
        observacao: [response.observacao],
        departamento: [response.departamento, Validators.required]
      })

      this.data = response.dataEntrada // PEGA A DATA SEM FORMATAÇÃO
      this.depto = response.departamento.nome // PEGA O NOME DO DEPARTAMENTO PARA EXIBIR NA UI
    })
  }

  /********************************************************\
                    MENSAGEM PADRÃO 
  \********************************************************/
  async alerta(header: string, text: string, handler: any) {
    const alert = await this.alertController.create({
      header,
      buttons: [
        {
          text,
          handler,
        }
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
