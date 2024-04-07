import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { DepartamentoNomeDTO } from 'src/app/models/DepartamentoNomeDTO';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';
import { TelValidator } from 'src/app/services/validators/TelValidator';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  editarUsuarioForm!: FormGroup
  departamentos!: DepartamentoNomeDTO[]

  protected telFormatado: any;

  constructor(
    private formBuilder: FormBuilder,
    private nav: NavController,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private departamentoService: DepartamentoService,
    private telValidator: TelValidator,
    private alerta: AlertsService
  ) { }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findByNomeSQL().subscribe({next: (response) =>
        this.departamentos = response,
        error: (error) => console.log(error)
    })
  }

  /********************************************************\
                  SALVAR EDIÇÃO
  \********************************************************/
  submit(){
    if(this.editarUsuarioForm.invalid || this.editarUsuarioForm.pending){
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let usuarioEdicao = {
      'id': this.editarUsuarioForm.value.id,
      'nome': this.editarUsuarioForm.value.nome,
      'cpf': this.editarUsuarioForm.value.cpf,
      'telefone': this.telFormatado || this.editarUsuarioForm.value.telefone,
      'foto': this.editarUsuarioForm.value.foto,
      'email': this.editarUsuarioForm.value.email,
      'departamento': {
        'id': this.editarUsuarioForm.value.departamento
      }
    }

    this.usuarioService.update(usuarioEdicao).subscribe({
      next: (response)=>{
        this.alerta.alertaOk('SUCESSO', 'O cadastro do usuário foi alterado', 'success', 'OK', ()=> this.nav.navigateForward('listagem-usuarios'))
      },
      error: (error)=> this.alerta.alertaOk('ERRO', 'Não foi possível alterar o cadastro, tente novamente mais tarde, ou contate o administrador do sistema',
       'error', 'OK', ()=> this.nav.navigateForward('listagem-usuarios'))
    })
  }

  /********************************************************\
                FORMATA NÚMERO DE TELEFONE
  \********************************************************/
  validaTelefone() {
    const telefone = this.editarUsuarioForm.value.telefone
    const telefoneFormatado = this.telValidator.telService(telefone);
    this.editarUsuarioForm.get('telefone')?.setValue(telefoneFormatado)

    this.telFormatado = telefoneFormatado
  }

  /********************************************************\
                    CANCELAR EDIÇÃO 
  \********************************************************/
  descartarAlteracao() {
    this.alerta.alertaPadrao('Deseja realmente descartar as alterações?', 'SIM', 'NÃO', 
    ()=>this.nav.navigateForward('listagem-usuarios'), ()=>{})
  }

  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.findById(id).subscribe(response=>{
      this.editarUsuarioForm = this.formBuilder.group({
        id: [response.id],
        nome: [response.nome, Validators.required],
        cpf: [response.cpf, Validators.required],
        telefone: [response.telefone, Validators.required],
        foto: [response.foto],
        email: [response.email, Validators.compose([Validators.required, Validators.email])],
        departamento: [response.departamento.id, Validators.required],
      })
    })
  }
}
