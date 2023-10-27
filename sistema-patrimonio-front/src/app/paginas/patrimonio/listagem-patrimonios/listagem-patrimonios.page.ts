import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PatrimonioDTO } from 'src/app/models/PatrimonioDTO';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';

@Component({
  selector: 'app-listagem-patrimonios',
  templateUrl: './listagem-patrimonios.page.html',
  styleUrls: ['./listagem-patrimonios.page.scss'],
})

export class ListagemPatrimoniosPage implements OnInit {

  patrimonios!: PatrimonioDTO[]

  constructor(public nav: NavController, public patrimonioService: PatrimonioService, private alertController: AlertController) { }

  /********************************************************\
                    LISTAGEM DOS PATRIMONIOS 
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.patrimonioService.findAll().subscribe({next: (response) =>
      this.patrimonios = response, 
      error: (error) => 
      console.log(error)
    })
  }

  /********************************************************\
                          EDITAR 
  \********************************************************/
  async editarSelecionado(id: number) {
    const alert = await this.alertController.create({
      header: 'Deseja realmente editar o Patrimônio?',
      buttons: [
        {
          text: 'EDITAR',
          role: 'editar',
          handler: () => {
            this.nav.navigateForward(`editar-patrimonio/${id}`)
          },
        },
        {
          text: 'CANCELAR',
          role: 'cancelar',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }



  /********************************************************\
                        TRANSFERIR 
  \********************************************************/
  async transferirSelecionado(id: number) {
    const alert = await this.alertController.create({
      header: 'Deseja realmente transferir o Patrimônio?',
      buttons: [
        {
          text: 'TRANSFERIR',
          role: 'transferir',
          handler: () => {
            this.nav.navigateForward(`transferir-patrimonio/${id}`)
            
          },
        },
        {
          text: 'CANCELAR',
          role: 'cancelar',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  /********************************************************\
                        BAIXAR 
  \********************************************************/
  async baixarSelecionado(id: number) {
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
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  /********************************************************\
                      GERAR RELATÓRIO 
  \********************************************************/




  ngOnInit() {
  }

}
