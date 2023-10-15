import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';

@Component({
  selector: 'app-cadastrar-departamento',
  templateUrl: './cadastrar-departamento.page.html',
  styleUrls: ['./cadastrar-departamento.page.scss'],
})
export class CadastrarDepartamentoPage implements OnInit {

  cadastrarDepartamentoForm!: FormGroup

  constructor(public nav: NavController, private alertController: AlertController, private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService) { }

  /********************************************************\
                      SALVAR EDIÇÃO
  \********************************************************/
  submit() {
    if (this.cadastrarDepartamentoForm.invalid || this.cadastrarDepartamentoForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let departamento = {
      nome: this.cadastrarDepartamentoForm.value.nome,
      telefone: this.cadastrarDepartamentoForm.value.telefone,
      email: this.cadastrarDepartamentoForm.value.email,
      endereco: this.cadastrarDepartamentoForm.value.endereco
    }

    this.departamentoService.insert(departamento).subscribe({
      next: (response) =>
        this.alerta(),
      error: (error) => console.log(error)
    })
  }

  ngOnInit() {
    this.cadastrarDepartamentoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      endereco: ['', Validators.required],
      empresa: {
        id: 1
      }
    })
  }

  /********************************************************\
                  MENSAGEM DE ALERTA 
  \********************************************************/
  async alerta() {
    const alert = await this.alertController.create({
      header: 'Departamento cadastrado com sucesso',
      message: 'Deseja cadastrar outro departamento?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            window.location.reload()
          }
        },
        {
          text: 'NÃO',
          role: 'nao',
          handler: () => {
            this.nav.navigateForward('listagem-departamentos')
          }
        }
      ]
    });

    await alert.present();
  }

}
