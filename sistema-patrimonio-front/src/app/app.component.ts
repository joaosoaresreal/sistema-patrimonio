import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './services/domain/Authentication.service';
import { AlertsService } from './services/alerts/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
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
    const userData = this.auth.dadosUsuario();
    if (userData) {
      this.usuario = userData.nomeUsuario;
      this.email = userData.emailUsuario;
      this.foto = userData.fotoUsuario ? userData.fotoUsuario : '../../../assets/user-icon-logado.png';
    }
    // this.usuario = this.auth.dadosUsuario().nomeUsuario
    // this.email = this.auth.dadosUsuario().emailUsuario
    // this.foto = this.auth.dadosUsuario().fotoUsuario ? this.auth.dadosUsuario().fotoUsuario: "../../../assets/user-icon-logado.png"
  }
}
