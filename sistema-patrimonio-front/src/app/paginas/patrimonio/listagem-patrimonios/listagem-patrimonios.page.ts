import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { PatrimonioDTO } from 'src/app/models/PatrimonioDTO';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';

@Component({
  selector: 'app-listagem-patrimonios',
  templateUrl: './listagem-patrimonios.page.html',
  styleUrls: ['./listagem-patrimonios.page.scss'],
})

export class ListagemPatrimoniosPage implements OnInit {

  queryField = new FormControl('') // Pesquisa
  patrimonios!: PatrimonioDTO[]
  patrimoniosFiltrados!: PatrimonioDTO[]

  constructor(public nav: NavController, public patrimonioService: PatrimonioService, private alertController: AlertController) { }

  /********************************************************\
              LISTAGEM E FILTRAGEM DOS PATRIMONIOS 
  \********************************************************/
  ionViewDidEnter() {
    this.patrimonioService.findByAtivos().subscribe({ // Carrega todos os patrimônios
      next: (response) => {
        this.patrimonios = response;

        // Após receber os dados, inicializa os patrimônios filtrados
        this.patrimoniosFiltrados = this.patrimonios.slice();
      },
      error: (error) => console.log(error)
    });

    // Observa mudanças no campo de pesquisa
    this.queryField.valueChanges.subscribe((query: string | null) => {
      if (query !== null) {
        this.filterPatrimonios(query);
      }
    });
  }

  filterPatrimonios(query: string) {
    query = query.toLowerCase();

    // Verifica se patrimonios não é nulo antes de filtrar
    if (this.patrimonios) {
      this.patrimoniosFiltrados = this.patrimonios.filter(
        // usado para verificar se a string convertida para minúsculas (toLowerCase()) contém a substring fornecida (query)
        (patrimonio) => patrimonio.descricao.toLowerCase().includes(query) || patrimonio.plaqueta.toLowerCase().includes(query)
      );
    }
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
