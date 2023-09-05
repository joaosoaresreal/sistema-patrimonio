import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-baixar-patrimonio',
  templateUrl: './baixar-patrimonio.page.html',
  styleUrls: ['./baixar-patrimonio.page.scss'],
})
export class BaixarPatrimonioPage implements OnInit {

  constructor(private alertController: AlertController, public nav: NavController) { }

  /*CONFIRMAÇÃO DO CANCELAMENTO DA BAIXA*/
  /* (https://ionicframework.com/docs/v6/api/alert) Buttons */
  async cancelarBaixa() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente descartar as alterações?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancelar',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'DESCARTAR',
          role: 'descartar',
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

  /*CONFIRMANDO A BAIXA */
  async efetivarBaixa() {
    const alert = await this.alertController.create({
      header: 'INFORME OS DADOS DO PROFISSIONAL QUE AUTORIZA A BAIXA',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancelar',
          handler: () => {
            
          },
        },
        {
          text: 'CONFIRMAR',
          role: 'confirmar',
          handler: () => {
            
          },
        },
      ],
      inputs: [
        {
          type: 'textarea',
          name: 'nome-profissional',
          placeholder: 'Nome Completo',
          value: ''
        },
        {
          type: 'number',
          name: 'cpf-profissional',
          placeholder: 'CPF',
          attributes: {
            maxlength: 11,
          },
          value: ''
        },
        {
          type: 'number',
          name: 'telefone-profissional',
          placeholder: 'Telefone',
          value: ''
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
