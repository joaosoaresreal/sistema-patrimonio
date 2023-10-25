import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UsuarioDTO } from 'src/app/models/UsuarioDTO';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.page.html',
  styleUrls: ['./listagem-usuarios.page.scss'],
})
export class ListagemUsuariosPage implements OnInit {

  usuarios!: UsuarioDTO[]

  constructor(public nav: NavController, public usuarioService: UsuarioService, private alertController: AlertController) { }

  /********************************************************\
                    LISTAGEM DOS USUARIOS 
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.usuarioService.findAll().subscribe(response => {
      this.usuarios = response
    }, error => {
      console.log(error)
    })
  }

  /********************************************************\
                    EDITAR USUARIO 
  \********************************************************/
  async editarSelecionado(id: number) {
    const alert = await this.alertController.create({
      header: 'Deseja realmente editar o usuário selecionado?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            this.nav.navigateForward(`editar-usuario/${id}`)
          },
        },
        {
          text: 'NÃO',
          role: 'nao',
          handler: () => {
            this.nav.navigateForward('listagem-usuarios')
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  /********************************************************\
                    EXCLUIR USUARIO 
  \********************************************************/
  async excluirSelecionado(id: number) {
    const alert = await this.alertController.create({
      header: 'Deseja realmente excluir o usuário selecionado?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            this.usuarioService.delete(id).subscribe({
              next: (response) => window.location.reload(),
              error: (error) => console.log(error)
            })
          },
        },
        {
          text: 'NÃO',
          role: 'nao',
          handler: () => {
            this.nav.navigateForward('listagem-usuarios')
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  /********************************************************\
                    CADASTRAR USUARIO 
  \********************************************************/
  cadastrarUsuario(){
    this.nav.navigateForward('cadastrar-usuario')
  }

  ngOnInit() {
  }

}
