import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { TelValidator } from 'src/app/services/validators/telValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.page.html',
  styleUrls: ['./editar-departamento.page.scss'],
})
export class EditarDepartamentoPage implements OnInit {

  editarDepartamentoForm!: FormGroup

  public telFormatado: any;

  constructor(public nav: NavController, private formBuilder: FormBuilder, private alertController: AlertController, private route: ActivatedRoute,
    private departamentoService: DepartamentoService, private telValidator: TelValidator) { }

  /********************************************************\
                  SALVAR EDIÇÃO
  \********************************************************/
  submit() {
    if (this.editarDepartamentoForm.invalid || this.editarDepartamentoForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let departamentoEdit = {
      'id': this.editarDepartamentoForm.value.id,
      'nome': this.editarDepartamentoForm.value.nome,
      'telefone': this.telFormatado || this.editarDepartamentoForm.value.telefone,
      'email': this.editarDepartamentoForm.value.email,
      'endereco': this.editarDepartamentoForm.value.endereco
    }

    console.log(departamentoEdit)

    this.departamentoService.update(departamentoEdit).subscribe({
      next: (response) =>
        this.alerta(),
      error: (error) => console.log(error)
    })
  }

  /********************************************************\
                FORMATA NÚMERO DE TELEFONE
  \********************************************************/
  validaTelefone() {
    const telefone = this.editarDepartamentoForm.value.telefone
    const telefoneFormatado = this.telValidator.telService(telefone);
    this.editarDepartamentoForm.get('telefone')?.setValue(telefoneFormatado)

    this.telFormatado = telefoneFormatado
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
        empresa: [response.empresa]
      })
    })
  }

  /********************************************************\
                    MENSAGEM PADRÃO 
  \********************************************************/
  alerta() {
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: 'SUCESSO',
      text: 'O cadastro do departamento foi alterado',
      icon: 'success',
      confirmButtonText: 'OK',
      // Customizção
      confirmButtonColor: 'var(--ion-color-success-tint)',
      cancelButtonColor: 'var(--ion-color-danger-tint)',
      backdrop: `linear-gradient(#a24b7599 100%, transparent 555%)`
    }).then(() => {
      {
        this.nav.navigateForward('listagem-departamentos')
      }
    })
  }

}
