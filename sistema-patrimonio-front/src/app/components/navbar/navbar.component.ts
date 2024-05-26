import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  usuario = this.auth.dadosUsuario().nomeUsuario
  departamento = this.auth.dadosUsuario().departamentoNome
  foto = this.auth.dadosUsuario().fotoUsuario ? this.auth.dadosUsuario().fotoUsuario: "../../../assets/user-icon-logado.png"

  ngOnInit() {}

}
