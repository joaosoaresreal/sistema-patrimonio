import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { PatrimonioDTO } from 'src/app/models/PatrimonioDTO';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';
import { DadosUser } from 'src/app/services/domain/user/DadosUser';

@Component({
  selector: 'app-listagem-patrimonios',
  templateUrl: './listagem-patrimonios.page.html',
  styleUrls: ['./listagem-patrimonios.page.scss'],
})

export class ListagemPatrimoniosPage implements OnInit {

  queryField = new FormControl('') // Pesquisa
  patrimonios!: PatrimonioDTO[]
  patrimoniosFiltrados!: PatrimonioDTO[]

  deptoId: any;

  constructor(
    public nav: NavController,
    public patrimonioService: PatrimonioService,
    private auth: AuthenticationService,
    private dados: DadosUser,
    private alerta: AlertsService,
  ) { }

  /********************************************************\
              LISTAGEM E FILTRAGEM DOS PATRIMONIOS 
  \********************************************************/
  ionViewDidEnter() {
    if(this.auth.hasRole("admin")){
      this.patrimonioService.findByAtivos().subscribe({ // Carrega todos os patrimônios
        next: (response) => {
          this.patrimonios = response;
  
          // Após receber os dados, inicializa os patrimônios filtrados
          this.patrimoniosFiltrados = this.patrimonios.slice();
        },
        error: (error) => this.alerta.alertaOk('ERRO', 'Não foi possível carregar os patrimônios, tente novamente ou entre em contato com o adiministrador do sistema',
          'warning', 'OK', () => this.nav.navigateForward('home'))
      });
    } else if(this.auth.hasRole("user")) {
      this.patrimonioService.findAtivosByDepartamento(this.deptoId).subscribe({ // Carrega somente os patrimônios do dpto do user
        next: (response) => {
          this.patrimonios = response;
  
          // Após receber os dados, inicializa os patrimônios filtrados
          this.patrimoniosFiltrados = this.patrimonios.slice();
        },
        error: (error) => this.alerta.alertaOk('ERRO', 'Não foi possível carregar os patrimônios, tente novamente ou entre em contato com o adiministrador do sistema',
          'warning', 'OK', () => this.nav.navigateForward('home'))
      });
    }


    // Observa mudanças no campo de pesquisa
    this.queryField.valueChanges.subscribe((query: string | null) => {
      if (query !== null) {
        this.filterPatrimonios(query);
      }
    });
  }

  filterPatrimonios(query: string) {
    query = query.toLowerCase();

    // Verifica se patrimonios não é nulo antes de filtrar
    if (this.patrimonios) {
      this.patrimoniosFiltrados = this.patrimonios.filter(
        // usado para verificar se a string convertida para minúsculas (toLowerCase()) contém a substring fornecida (query)
        (patrimonio) => patrimonio.descricao.toLowerCase().includes(query) || patrimonio.plaqueta.toLowerCase().includes(query)
      );
    }
  }

  /********************************************************\
                          EDITAR 
  \********************************************************/
  editarSelecionado(id: number){
    this.alerta.alertaPadrao('Deseja editar o Patrimônio selecionado?','SIM', 'NÃO', 
    ()=>this.nav.navigateForward(`editar-patrimonio/${id}`), () => {})
  }

  /********************************************************\
                        TRANSFERIR 
  \********************************************************/
  transferirSelecionado(id: number) {
    this.alerta.alertaPadrao('Deseja transferir o Patrimônio selecionado?', 'SIM', 'NÃO',
    ()=>this.nav.navigateForward(`transferir-patrimonio/${id}`), ()=>{})
  }

  /********************************************************\
                        BAIXAR 
  \********************************************************/
  baixarSelecionado(id: number){
    this.alerta.alertaPadrao('Deseja baixar o Patrimonio selecionado?', 'SIM', 'NÃO', 
    ()=> this.nav.navigateForward(`baixar-patrimonio/${id}`), ()=>{})
  }

  /********************************************************\
                      GERAR RELATÓRIO 
  \********************************************************/


  ngOnInit() {
    this.dados.dadosUsuarioAPI().subscribe(data => {
      this.deptoId = data.deptoId
    });
  }

}
