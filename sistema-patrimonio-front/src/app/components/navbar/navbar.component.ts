import { Component, OnInit } from '@angular/core';
import { DadosUser } from 'src/app/services/domain/user/DadosUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  foto: any;
  departamento: any;
  usuario: any;

  constructor(
    private dados: DadosUser
  ) { }

  ngOnInit() {
    this.dados.dadosUsuarioAPI().subscribe(data => {
      this.usuario = data.nickName;
      this.departamento = data.deptoNome;
      this.foto = data.foto;
    });
  }

}
