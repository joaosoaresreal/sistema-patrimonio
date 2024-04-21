import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from './services/domain/Authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(private alertController: AlertController, public nav: NavController, protected auth: AuthenticationService) {}

  userDataString = JSON.parse(localStorage.getItem('userData')  || '{}');
  usuario = this.userDataString.usuario
  email = this.userDataString.email

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
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userData');
            this.nav.navigateForward('login')
          },
        },
      ],
    });

    await alert.present();
  }


  meuUsuario(){
    this.nav.navigateForward('meu-usuario')
  }
}
