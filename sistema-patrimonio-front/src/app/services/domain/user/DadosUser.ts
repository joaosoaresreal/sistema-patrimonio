import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../Authentication.service';
import { UsuarioService } from '../Usuario.service';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class DadosUser {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthenticationService
  ) {}

  dadosUsuarioAPI(): Observable<any> {
    const userId = this.authService.dadosUsuario().idUsuario;

    return this.usuarioService.findById(userId).pipe(
      switchMap(response => {
        let fotoUrl = response.foto ? `${API_CONFIG.baseUrl}/files/${response.foto}` : "/assets/user-icon-logado.png";

        return of({
          'nickName': response.nickName,
          'nome': response.nome,
          'foto': fotoUrl,
          'email': this.authService.dadosUsuario().emailUsuario,
          'deptoId': response.departamento.id,
          'deptoNome': response.departamento.nome
        });
      })
    );
  }
}
