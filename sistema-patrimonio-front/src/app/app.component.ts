import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './services/domain/Authentication.service';
import { AlertsService } from './services/alerts/alerts.service';
import { DadosUser } from './services/domain/user/DadosUser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private dados: DadosUser,
    public nav: NavController,
    protected auth: AuthenticationService,
    private alerta: AlertsService
  ) {}

  protected usuario:any
  protected email:any
  protected foto:any

  sairSistema(){
    this.alerta.alertaPadrao(
      'Deseja realmente sair do sistema?', 'SIM', 'NÃO', 
      () => {this.auth.logout()}, 
      () => { }
    )
  }

  meuUsuario(){
    this.nav.navigateForward('meu-usuario')
  }

  ngOnInit() {
    // const userData = this.auth.dadosUsuario();
    // if (userData) {
    //   this.usuario = userData.nomeUsuario;
    //   this.email = userData.emailUsuario;
    //   this.foto = userData.fotoUsuario ? userData.fotoUsuario : '../../../assets/user-icon-logado.png';
    // }
    this.dados.dadosUsuarioAPI().subscribe(data => {
      this.usuario = data.nome;
      this.email = data.email;
      this.foto = data.foto;
    });
  }
}
