import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';
import { DadosUser } from 'src/app/services/domain/user/DadosUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Gerando a data do dia, de forma automatizada
  today: number = Date.now();
  usuarioHome: any

  constructor(
    public nav: NavController,
    private dados: DadosUser,
    protected auth: AuthenticationService
  ) { }

  abrirPagina(page: string){
    this.nav.navigateForward(page)
  }

  ngOnInit() {
    this.dados.dadosUsuarioAPI().subscribe(data => {
      this.usuarioHome = data.nickName;
    });
  }
}
