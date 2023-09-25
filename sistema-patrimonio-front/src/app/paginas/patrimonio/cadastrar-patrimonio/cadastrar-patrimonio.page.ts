import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  //depto = undefined

  constructor(private formBuilder: FormBuilder, private patrimonioService: PatrimonioService,
    private departamentoService: DepartamentoService) { }

  submit() {

    console.log(this.patrimonioForm.value)
    /*
    this.patrimonioService.insert(this.patrimonioForm.value).subscribe(response=>{
      console.log("salvo")
    })*/
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
  public optionsFn():void {
    //console.log(this.deptoSelecionado)
    //let item = this.deptoSelecionado

  }

  ngOnInit() {
    this.patrimonioForm = this.formBuilder.group({
      plaqueta: ['', Validators.required],
      descricao: ['', Validators.required],
      estado: ['BOM',],
      localizacao: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      observacao: [''],
      departamento: {
        id: []
      }
    })
  }

}
