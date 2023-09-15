import { Component, OnInit } from '@angular/core';
import { DepartamentoDTO } from 'src/app/models/DepartamentoDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';

@Component({
  selector: 'app-listagem-departamentos',
  templateUrl: './listagem-departamentos.page.html',
  styleUrls: ['./listagem-departamentos.page.scss'],
})
export class ListagemDepartamentosPage implements OnInit {

  departamentos!: DepartamentoDTO[]

  constructor(public departamentoService: DepartamentoService) { }

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

  ngOnInit() {
  }

}
