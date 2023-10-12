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

  public patrimonioId: any
  public disabled = false

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
                  SELEÇÃO DO CHECKBOX 
  \********************************************************/
  patrimonioSelecionado(event: any) {
    if(event.detail.checked) {
      console.log(`Clicou no checkbox`, event);
      this.patrimonioId = event.detail.value

      if(this.patrimonioId !== event.detail.value){
        this.disabled = false
      } 
      if(this.patrimonioId === event.detail.value) {
        this.disabled = true
      }


      console.log(this.patrimonioId)

      
      // if(event.detail.checked === 1){
      //   console.log('marcou um')
      // } else if(event.detail.checked > 1){
      //   console.log('teste maior que um')
      // }

    } else if (!event.detail.checked) {
      console.log(`desclicou`, event);
    }
  }

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
      header: 'Deseja realmente transferir o Patrimônio selecionado?',
      buttons: [
        {
          text: 'TRANSFERIR',
          role: 'transferir',
          handler: () => {
            this.nav.navigateForward(`transferir-patrimonio/${this.patrimonioId}`)
            
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

    console.log(this.disabled)


  }

  // teste(){
  //   console.log("teste")
  // }

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
