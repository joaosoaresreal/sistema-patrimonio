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
  depto = Number

  constructor(private formBuilder: FormBuilder, private patrimonioService: PatrimonioService,
    private departamentoService: DepartamentoService, private alertController: AlertController) { }

  submit() {
    // if(this.patrimonioForm.invalid || this.patrimonioForm.pending){
    //   return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    // }

    console.log(this.patrimonioForm.value)

    // this.patrimonioService.insert(this.patrimonioForm.value).subscribe(response=>{
    //    this.presentAlert('Sucesso', 
    //   'O Patrimonio foi cadastrado com sucesso', ['OK']);
    // })
  }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findAll().subscribe(response => {
      this.departamentos = response
    }, error => {
      console.log(error)
    })
  }

  //https://ionicframework.com/docs/v6/api/select (Referências de valor de objeto)
  public handleChange(e:any) {
    //console.log(e)
    this.depto = e.detail.value
    console.log(this.depto)

  }

  ngOnInit() {
    this.patrimonioForm = this.formBuilder.group({
      plaqueta: ['', Validators.required],
      descricao: ['', Validators.required],
      estado: ['', Validators.required],
      localizacao: ['', Validators.required],
      dataEntrada: [''],
      observacao: [''],
      departamento: {
        id: [this.depto, Validators.required]
      }
    })
  }

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
