import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.page.html',
  styleUrls: ['./editar-departamento.page.scss'],
})
export class EditarDepartamentoPage implements OnInit {

  editarDepartamentoForm!: FormGroup

  constructor(public nav: NavController, private formBuilder: FormBuilder, private alertController: AlertController, private route: ActivatedRoute,
    private departamentoService: DepartamentoService) { }

  /********************************************************\
                  SALVAR EDIÇÃO
  \********************************************************/
  submit() {
    if (this.editarDepartamentoForm.invalid || this.editarDepartamentoForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    this.departamentoService.update(this.editarDepartamentoForm.value).subscribe({
      next: (response) =>
        this.alerta('Usuário alterado com sucesso', 'OK', () => { this.nav.navigateForward('listagem-departamentos') }),
      error: (error) => console.log(error)
    })
  }

  /********************************************************\
                  CANCELAR EDIÇÃO 
  \********************************************************/
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente descartar as alterações?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            this.nav.navigateForward('listagem-departamentos')
          },
        },
        {
          text: 'NÃO',
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
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.departamentoService.findById(id).subscribe(response => {
      this.editarDepartamentoForm = this.formBuilder.group({
        id: [response.id],
        nome: [response.nome, Validators.required],
        telefone: [response.telefone, Validators.required],
        email: [response.email, Validators.compose([Validators.required, Validators.email])],
        endereco: [response.endereco, Validators.required],
        empresa: [response.empresa, Validators.required]
      })
    })
  }

  /********************************************************\
                    MENSAGEM PADRÃO 
  \********************************************************/
  async alerta(header: string, text: string, handler: any) {
    const alert = await this.alertController.create({
      header,
      buttons: [
        {
          text,
          handler,
        }
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
