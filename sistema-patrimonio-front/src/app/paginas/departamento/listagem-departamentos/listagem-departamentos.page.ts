import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoDTO } from 'src/app/models/DepartamentoDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';

@Component({
  selector: 'app-listagem-departamentos',
  templateUrl: './listagem-departamentos.page.html',
  styleUrls: ['./listagem-departamentos.page.scss'],
})
export class ListagemDepartamentosPage implements OnInit {

  departamentos!: DepartamentoDTO[]

  constructor(public nav: NavController, public departamentoService: DepartamentoService, private alertController: AlertController) { }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findAll().subscribe({
      next: response =>
        this.departamentos = response,
      error: (error) =>
        console.log(error)
    })
  }

  /********************************************************\
                    CADASTRAR DEPARTAMENTO
  \********************************************************/
  cadastrarDepartamento() {
    this.nav.navigateForward('cadastrar-departamento')
  }

  /********************************************************\
                    EDITAR DEPARTAMENTO
  \********************************************************/
  async editarSelecionado(id: number) {
    const alert = await this.alertController.create({
      header: 'Deseja realmente editar o Departamento selecionado?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            this.nav.navigateForward(`editar-departamento/${id}`)
          },
        },
        {
          text: 'NAO',
          role: 'nao',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  /********************************************************\
                    EXCLUIR DEPARTAMENTO
  \********************************************************/
  async excluirSelecionado(id: number) {
    const alert = await this.alertController.create({
      header: 'Deseja realmente excluir o Departamento selecionado?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            this.departamentoService.delete(id).subscribe({
              next: (response) => window.location.reload(),
              error: (error) => console.log(error)
            })
          },
        },
        {
          text: 'NAO',
          role: 'nao',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  ngOnInit() {
  }

}
