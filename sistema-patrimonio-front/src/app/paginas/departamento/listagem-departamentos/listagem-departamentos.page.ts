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

  public departamentoId: any
  public disabled = false

  constructor(public nav: NavController, public departamentoService: DepartamentoService, private alertController: AlertController) { }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findAll().subscribe({next: response => 
      this.departamentos = response,
      error: (error) => 
      console.log(error)
    })
  }

  /********************************************************\
                  SELEÇÃO DO CHECKBOX 
  \********************************************************/
  departamentoSelecionado(event: any) {
    if(event.detail.checked) {
      console.log(`Clicou no checkbox`, event);
      this.departamentoId = event.detail.value

      if(this.departamentoId !== event.detail.value){
        this.disabled = false
      } 
      if(this.departamentoId === event.detail.value) {
        this.disabled = true
      }


      console.log(this.departamentoId)

      
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
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  cadastrarDepartamento(){
    this.nav.navigateForward('cadastrar-departamento')
  }

  /********************************************************\
                    EDITAR DEPARTAMENTO
  \********************************************************/
  async editarSelecionado(){
    const alert = await this.alertController.create({
      header: 'Deseja realmente editar o Departamento selecionado?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            this.nav.navigateForward(`editar-departamento/${this.departamentoId}`)
          },
        },
        {
          text: 'NAO',
          role: 'nao',
          handler: () => {

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  /********************************************************\
                    EXCLUIR DEPARTAMENTO
  \********************************************************/
  async excluirSelecionado(){
    const alert = await this.alertController.create({
      header: 'Deseja realmente editar o Departamento selecionado?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            this.departamentoService.delete(this.departamentoId).subscribe({
              next: (response) => window.location.reload(),
              error: (error) => console.log(error)
            })
          },
        },
        {
          text: 'NAO',
          role: 'nao',
          handler: () => {

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
