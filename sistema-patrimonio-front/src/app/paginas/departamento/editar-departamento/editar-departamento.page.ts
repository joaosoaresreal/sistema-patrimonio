import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.page.html',
  styleUrls: ['./editar-departamento.page.scss'],
})
export class EditarDepartamentoPage implements OnInit {

  constructor(private alertController: AlertController) { }

  /* (https://ionicframework.com/docs/v6/api/alert) Buttons */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente descartar as alterações?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'DESCARTAR',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'DESCARTAR',
          role: 'DESCARTAR',
          handler: () => {
            //this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  ngOnInit() {
  }

}
