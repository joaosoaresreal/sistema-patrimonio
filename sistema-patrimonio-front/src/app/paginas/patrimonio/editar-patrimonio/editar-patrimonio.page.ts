import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NavController } from '@ionic/angular';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-editar-patrimonio',
  templateUrl: './editar-patrimonio.page.html',
  styleUrls: ['./editar-patrimonio.page.scss'],
})
export class EditarPatrimonioPage implements OnInit {

  editarPatrimonioForm!: FormGroup

  data = ''
  depto = ''

  constructor(private formBuilder: FormBuilder, private patrimonioService: PatrimonioService, private route: ActivatedRoute,
   public nav: NavController, private alerta: AlertsService) { }

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
        'id': this.editarPatrimonioForm.value.departamento.id,
      }
    }

    this.patrimonioService.update(patrimonioEdit).subscribe({
      next: (response) => 
        this.alerta.alertaOk('SUCESSO', 'O cadastro do patrimônio foi alterado', 'success', 'OK', ()=>this.nav.navigateForward('listagem-patrimonios')),
      error: (error) => 
        this.alerta.alertaAtencao('ERRO', 'Não foi possivel alterar os dados, tente novamente mais tarde ou contate o administrador do sistema',
      'error', false, 'OK')
    })
  }

  /********************************************************\
                  CANCELAR EDIÇÃO 
  \********************************************************/
  cancelar() {
    this.alerta.alertaPadrao('Deseja realmente descartar as alterações?', 'SIM', 'NÃO', ()=>this.nav.navigateForward('listagem-patrimonios'), ()=>{})
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
}
