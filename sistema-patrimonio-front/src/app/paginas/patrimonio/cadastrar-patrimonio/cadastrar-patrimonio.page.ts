import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DepartamentoDTO } from 'src/app/models/DepartamentoDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';

@Component({
  selector: 'app-cadastrar-patrimonio',
  templateUrl: './cadastrar-patrimonio.page.html',
  styleUrls: ['./cadastrar-patrimonio.page.scss'],
})
export class CadastrarPatrimonioPage implements OnInit {

  patrimonioForm!: FormGroup
  departamentos!: DepartamentoDTO[]

  constructor(private formBuilder: FormBuilder, private patrimonioService: PatrimonioService,
    private departamentoService: DepartamentoService, private alertController: AlertController) { }

  /********************************************************\
                  SALVA O FORMULÁRIO
  \********************************************************/
  submit() {
    if(this.patrimonioForm.invalid || this.patrimonioForm.pending){
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let patrimonio = {
      'plaqueta': this.patrimonioForm.value.plaqueta,
      'descricao': this.patrimonioForm.value.descricao,
      'estado': this.patrimonioForm.value.estado,
      'localizacao': this.patrimonioForm.value.localizacao,
      'dataEntrada': this.patrimonioForm.value.dataEntrada,
      'observacao': this.patrimonioForm.value.observacao,
      'departamento':{
        'id': this.patrimonioForm.value.departamento,
      }
    }

    console.log(this.patrimonioForm.value)
    console.log(patrimonio)

    this.patrimonioService.insert(patrimonio).subscribe(response=>{
       this.presentAlert('Sucesso', 
      'O Patrimonio foi cadastrado com sucesso', ['OK']);
    })
  }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findAll().subscribe({next: (response)=>
      this.departamentos = response, 
      error: (error) => console.log(error)
  })
  }

  ngOnInit() {
    this.patrimonioForm = this.formBuilder.group({
      plaqueta: ['', Validators.required],
      descricao: ['', Validators.required],
      estado: ['', Validators.required],
      localizacao: ['', Validators.required],
      dataEntrada: [''],
      observacao: [''],
      departamento: ['', Validators.required]
    })
  }

  /********************************************************\
                  MENSAGEM DE ALERTA PADRÃO
  \********************************************************/
  async presentAlert(header: string,
    message: string, buttons: string[],) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
    });

    await alert.present();
  }

}
