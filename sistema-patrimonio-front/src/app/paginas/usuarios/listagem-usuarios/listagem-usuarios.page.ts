import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/models/UsuarioDTO';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.page.html',
  styleUrls: ['./listagem-usuarios.page.scss'],
})
export class ListagemUsuariosPage implements OnInit {

  usuarios!: UsuarioDTO[]

  constructor(public usuarioService: UsuarioService) { }

  /********************************************************\
                    LISTAGEM DOS USUARIOS 
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.usuarioService.findAll().subscribe(response => {
      this.usuarios = response
    }, error => {
      console.log(error)
    })
  }

  ngOnInit() {
  }

}
