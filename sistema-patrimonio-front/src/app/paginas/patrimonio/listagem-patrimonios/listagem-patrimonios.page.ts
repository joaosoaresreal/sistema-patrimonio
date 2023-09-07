import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-listagem-patrimonios',
  templateUrl: './listagem-patrimonios.page.html',
  styleUrls: ['./listagem-patrimonios.page.scss'],
})

export class ListagemPatrimoniosPage implements OnInit {

  constructor(public nav: NavController, private alertController: AlertController) { }

  /********************************************************\
                          EDITAR 
  \********************************************************/
  async editarSelecionado() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente editar o Patrimônio?',
      buttons: [
        {
          text: 'EDITAR',
          role: 'editar',
          handler: () => {
            this.nav.navigateForward('editar-patrimonio')
          },
        },
        {
          text: 'CANCELAR',
          role: 'cancelar',
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


  /********************************************************\
                        TRANSFERIR 
  \********************************************************/
  async transferirSelecionado() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente transferir o Patrimônio?',
      buttons: [
        {
          text: 'TRANSFERIR',
          role: 'transferir',
          handler: () => {
            this.nav.navigateForward('transferir-patrimonio')
          },
        },
        {
          text: 'CANCELAR',
          role: 'cancelar',
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

  /********************************************************\
                        BAIXAR 
  \********************************************************/
  async baixarSelecionado() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente baixar o Patrimônio?',
      buttons: [
        {
          text: 'BAIXAR',
          role: 'baixar',
          handler: () => {
            this.nav.navigateForward('baixar-patrimonio')
          },
        },
        {
          text: 'CANCELAR',
          role: 'cancelar',
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

  /********************************************************\
                      GERAR RELATÓRIO 
  \********************************************************/




  ngOnInit() {
  }

}
