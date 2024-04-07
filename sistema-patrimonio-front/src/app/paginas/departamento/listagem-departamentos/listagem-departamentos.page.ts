import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { DepartamentoDTO } from 'src/app/models/DepartamentoDTO';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';

@Component({
  selector: 'app-listagem-departamentos',
  templateUrl: './listagem-departamentos.page.html',
  styleUrls: ['./listagem-departamentos.page.scss'],
})
export class ListagemDepartamentosPage implements OnInit {

  departamentos!: DepartamentoDTO[]

  constructor(
    public nav: NavController,
    public departamentoService: DepartamentoService,
    private alerta: AlertsService
  ) { }

  /********************************************************\
                  LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findAll().subscribe({
      next: response =>
        this.departamentos = response,
      error: (error) =>
        console.log(error)
    })
  }

  /********************************************************\
                    CADASTRAR DEPARTAMENTO
  \********************************************************/
  cadastrarDepartamento() {
    this.nav.navigateForward('cadastrar-departamento')
  }

  /********************************************************\
                    EDITAR DEPARTAMENTO
  \********************************************************/
  editarSelecionado(id: number) {
    this.alerta.alertaPadrao('Deseja editar o Departamento selecionado?', 'SIM', 'NÃO', ()=>this.nav.navigateForward(`editar-departamento/${id}`), ()=>{})
  }

  /********************************************************\
                    EXCLUIR DEPARTAMENTO
  \********************************************************/
  async excluirSelecionado(id: number) {
    this.alerta.alertaPadrao('Deseja excluir o Departamento selecionado?', 'SIM', 'NÃO', 
      ()=>{ // Aqui vai verificar se é possivel excluir
        this.departamentoService.delete(id).subscribe({
          next: (response) => window.location.reload(),
          error: (error) => {this.alerta.alertaOk('ATENÇÃO', 'Não foi possível excluir o cadastro do departamento', 'warning', 'OK', ()=>{})}
        })
      }, // Se a resposta do usuário for 'não' fecha o modal
      ()=>{}
    )
  }

  ngOnInit() {
  }
}
