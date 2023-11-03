import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
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
