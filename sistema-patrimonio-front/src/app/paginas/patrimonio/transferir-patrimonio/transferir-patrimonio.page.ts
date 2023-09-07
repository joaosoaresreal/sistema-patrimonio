import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-transferir-patrimonio',
  templateUrl: './transferir-patrimonio.page.html',
  styleUrls: ['./transferir-patrimonio.page.scss'],
})
export class TransferirPatrimonioPage implements OnInit {

  constructor(public nav: NavController, private alertController: AlertController) { }

    /********************************************************\
                        CANCELAR E VOLTAR 
    \********************************************************/
  async cancelar() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente cancelar a transferencia?',
      buttons: [
        {
          text: 'PROSSEGUIR',
          role: 'prosseguir',
          handler: () => {
            
          },
        },
        {
          text: 'CANCELAR',
          role: 'cancelar',
          handler: () => {
            this.nav.navigateForward('listagem-patrimonios')
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
