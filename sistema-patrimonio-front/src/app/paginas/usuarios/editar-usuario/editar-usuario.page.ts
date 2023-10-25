import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { DepartamentoNomeDTO } from 'src/app/models/DepartamentoNomeDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  editarUsuarioForm!: FormGroup
  departamentos!: DepartamentoNomeDTO[]

  constructor(private formBuilder: FormBuilder, public nav: NavController, private alertController: AlertController, 
    private route: ActivatedRoute, private usuarioService: UsuarioService, private departamentoService: DepartamentoService) { }

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
      'telefone': this.editarUsuarioForm.value.telefone,
      'foto': this.editarUsuarioForm.value.foto,
      'email': this.editarUsuarioForm.value.email,
      'senha': this.editarUsuarioForm.value.senha,
      'departamento': {
        'id': this.editarUsuarioForm.value.departamento
      }
    }
    console.log(usuarioEdicao)
    
    this.usuarioService.update(usuarioEdicao).subscribe(response=>{
      this.alerta('Usuário alterado com sucesso', 'OK', () => { this.nav.navigateForward('listagem-usuarios') })
    })
  }

  /********************************************************\
                  CANCELAR EDIÇÃO 
  \********************************************************/
  async descartarAlteracao() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente descartar as alterações?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            this.nav.navigateForward('listagem-usuarios')
          },
        },
        {
          text: 'NÃO',
          role: 'nao',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
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
        senha: [response.senha, Validators.compose([Validators.required, Validators.minLength(8)])],
        departamento: [response.departamento, Validators.required],
      })
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
