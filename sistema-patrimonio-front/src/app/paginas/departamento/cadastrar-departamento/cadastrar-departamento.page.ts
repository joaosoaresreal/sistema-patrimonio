import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { TelValidator } from 'src/app/services/validators/telValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-departamento',
  templateUrl: './cadastrar-departamento.page.html',
  styleUrls: ['./cadastrar-departamento.page.scss'],
})
export class CadastrarDepartamentoPage implements OnInit {

  cadastrarDepartamentoForm!: FormGroup

  public telFormatado: any;

  constructor(public nav: NavController, private alertController: AlertController, private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService, private telValidator: TelValidator) { }

  /********************************************************\
                      SALVAR EDIÇÃO
  \********************************************************/
  submit() {
    if (this.cadastrarDepartamentoForm.invalid || this.cadastrarDepartamentoForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let departamento = {
      nome: this.cadastrarDepartamentoForm.value.nome,
      telefone: this.telFormatado,
      email: this.cadastrarDepartamentoForm.value.email,
      endereco: this.cadastrarDepartamentoForm.value.endereco
    }

    this.departamentoService.insert(departamento).subscribe({
      next: (response) =>
        this.alerta(),
      error: (error) => console.log(error)
    })
  }

  /********************************************************\
                FORMATA NÚMERO DE TELEFONE
  \********************************************************/
  validaTelefone() {
    const telefone = this.cadastrarDepartamentoForm.value.telefone
    const telefoneFormatado = this.telValidator.telService(telefone);
    this.cadastrarDepartamentoForm.get('telefone')?.setValue(telefoneFormatado)
    
    this.telFormatado = telefoneFormatado
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
  alerta() {
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: 'SUCESSO',
      text: 'O departamento foi incluido com sucesso no sistema',
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
