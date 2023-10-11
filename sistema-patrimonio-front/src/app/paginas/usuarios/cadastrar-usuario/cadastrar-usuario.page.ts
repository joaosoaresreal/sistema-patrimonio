import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoDTO } from 'src/app/models/DepartamentoDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  usuarioForm!: FormGroup
  departamentos!: DepartamentoDTO[]

  constructor(private formBuilder: FormBuilder, private departamentoService: DepartamentoService, 
    private usuarioService: UsuarioService, private alertController: AlertController, public nav: NavController) { }

  /********************************************************\
                  SALVA O FORMULÁRIO
  \********************************************************/
  submit() {
    if(this.usuarioForm.invalid || this.usuarioForm.pending){
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let usuario = {
      'nome': this.usuarioForm.value.nome,
      'cpf': this.usuarioForm.value.cpf,
      'telefone': this.usuarioForm.value.telefone,
      'foto': this.usuarioForm.value.foto,
      'email': this.usuarioForm.value.email,
      'senha': this.usuarioForm.value.senha,
      'departamento': {
        'id': this.usuarioForm.value.departamento
      }
    }

    console.log(this.usuarioForm.value)
    console.log(usuario)

    this.usuarioService.insert(usuario).subscribe({next: (response) => 
      this.alertController.create({
        header: 'Usuário cadastrado com sucesso',
        buttons: [
          {
            text: 'OK',
            role: 'ok',
            handler:()=>{
              this.nav.navigateForward('listagem-usuarios')
            }
          }
        ]
      }), 
      error: (error) => console.log(error)
    })
  
  }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findAll().subscribe({next: (response)=>
      this.departamentos = response, 
      error: (error) => console.log(error)
  })
  }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      foto: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      departamento: {
        id: ['', Validators.required]
      }
    })
  }

}
