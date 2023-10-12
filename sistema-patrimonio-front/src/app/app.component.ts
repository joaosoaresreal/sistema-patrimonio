import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },

    { title: 'Listar Patrimônios', url: '/listagem-patrimonios', icon: 'albums' },
    { title: 'Cadastrar Patrimônio', url: '/cadastrar-patrimonio', icon: 'add' },

    { title: 'Listar Usuários', url: '/listagem-usuarios', icon: 'people' },
    { title: 'Cadastrar Usuário', url: '/cadastrar-usuario', icon: 'person-add' },

    { title: 'Listar Departamentos', url: '/listagem-departamentos', icon: 'copy' },
    { title: 'Cadastrar Departamento', url: '/cadastrar-departamento', icon: 'create' },
  ];

  constructor(private alertController: AlertController, public nav: NavController) {}

  /* (https://ionicframework.com/docs/v6/api/alert) Buttons */
  async sairSistema() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'SAIR',
          role: 'loggout',
          handler: () => {
            this.nav.navigateForward('login')
          },
        },
      ],
    });

    await alert.present();
  }
}
