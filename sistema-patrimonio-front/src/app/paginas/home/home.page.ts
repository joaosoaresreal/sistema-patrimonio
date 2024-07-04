import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Gerando a data do dia, de forma automatizada
  today: number = Date.now();

  constructor(
    public nav: NavController,
    protected auth: AuthenticationService
  ) { }

  usuarioHome = this.auth.dadosUsuario().nomeUsuario

  abrirPagina(page: string){
    this.nav.navigateForward(page)
  }

  ngOnInit() {
  }
}
