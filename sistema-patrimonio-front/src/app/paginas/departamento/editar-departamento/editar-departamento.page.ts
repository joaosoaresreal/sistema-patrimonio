import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { TelValidator } from 'src/app/services/validators/TelValidator';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.page.html',
  styleUrls: ['./editar-departamento.page.scss'],
})
export class EditarDepartamentoPage implements OnInit {

  editarDepartamentoForm!: FormGroup

  protected telFormatado: any;

  constructor(
    public nav: NavController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private departamentoService: DepartamentoService,
    private telValidator: TelValidator,
    private alerta: AlertsService
  ) { }

  /********************************************************\
                  SALVAR EDIÇÃO
  \********************************************************/
  submit() {
    if (this.editarDepartamentoForm.invalid || this.editarDepartamentoForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let departamentoEdit = {
      'id': this.editarDepartamentoForm.value.id,
      'nome': this.editarDepartamentoForm.value.nome,
      'telefone': this.telFormatado || this.editarDepartamentoForm.value.telefone,
      'email': this.editarDepartamentoForm.value.email,
      'endereco': this.editarDepartamentoForm.value.endereco
    }

    this.departamentoService.update(departamentoEdit).subscribe({
      next: (response) =>
        this.alerta.alertaOk('SUCESSO', 'O cadastro do departamento foi alterado', 'success', 'OK', ()=>this.nav.navigateForward('listagem-departamentos')),
      error: (error) => 
      this.alerta.alertaAtencao('ERRO', 'Não foi possivel alterar os dados, tente novamente mais tarde ou contate o administrador do sistema',
      'error', false, 'OK')
    })
  }

  /********************************************************\
                FORMATA NÚMERO DE TELEFONE
  \********************************************************/
  validaTelefone() {
    const telefone = this.editarDepartamentoForm.value.telefone
    const telefoneFormatado = this.telValidator.telService(telefone);
    this.editarDepartamentoForm.get('telefone')?.setValue(telefoneFormatado)

    this.telFormatado = telefoneFormatado
  }

  /********************************************************\
                  CANCELAR EDIÇÃO 
  \********************************************************/
  cancelaEdicao(){
    this.alerta.alertaPadrao('Deseja realmente descartar as alterações?', 'SIM', 'NÃO', ()=>this.nav.navigateForward('listagem-departamentos'), ()=>{})
  }


  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.departamentoService.findById(id).subscribe(response => {
      this.editarDepartamentoForm = this.formBuilder.group({
        id: [response.id],
        nome: [response.nome, Validators.required],
        telefone: [response.telefone, Validators.required],
        email: [response.email, Validators.compose([Validators.required, Validators.email])],
        endereco: [response.endereco, Validators.required],
        empresa: [response.empresa]
      })
    })
  }

}
