import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { TelValidator } from 'src/app/services/validators/TelValidator';

@Component({
  selector: 'app-cadastrar-departamento',
  templateUrl: './cadastrar-departamento.page.html',
  styleUrls: ['./cadastrar-departamento.page.scss'],
})
export class CadastrarDepartamentoPage implements OnInit {

  cadastrarDepartamentoForm!: FormGroup
  protected telFormatado: any;

  constructor(
    public nav: NavController, 
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService, 
    private telValidator: TelValidator,
    private alerta: AlertsService
  ) { }

  /********************************************************\
                      SALVAR EDIÇÃO
  \********************************************************/
  submit() {
    if (this.cadastrarDepartamentoForm.invalid || this.cadastrarDepartamentoForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let departamento = {
      'nome': this.cadastrarDepartamentoForm.value.nome,
      'telefone': this.telFormatado,
      'email': this.cadastrarDepartamentoForm.value.email,
      'endereco': this.cadastrarDepartamentoForm.value.endereco
    }

    this.departamentoService.insert(departamento).subscribe({
      next: (response) =>
        this.alerta.alertaAcoes(
          'SUCESSO', 'O cadastro do departamento foi incluido no sistema. Deseja cadastrar outro departamento?',
          'success', 'SIM', 'NÃO', () => window.location.reload(), () => {
            this.nav.navigateForward('listagem-departamentos')
            this.cadastrarDepartamentoForm.reset()
          }
        ),
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
}
