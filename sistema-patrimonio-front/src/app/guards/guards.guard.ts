// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

// @Injectable()
// class UserToken {}

// @Injectable()
// class PermissionsService {
//   constructor(){}

//   canActivate(currentUser: UserToken, userId: string): boolean {
//     return true;
//   }
//   canMatch(currentUser: UserToken): boolean {
//     return true;
//   }
// }

// export const Guards: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
// ) => {
//   return false;
// }

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/domain/Authentication.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Guards {

  constructor(private authService: AuthenticationService, private router: Router, private toast: ToastController) {}

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Você não possui permissão para este acesso',
      duration: 5000,
      // color: 'tertiary',
      position: 'top',
    });

    await toast.present();
  }

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
    console.log("entrou no Guards")
    console.log("esta autenticado? "+this.authService.isAuthenticated())
    console.log("role " + this.authService.hasRole)
    // Verifica se o usuário está autenticado
    if (!this.authService.isAuthenticated()) {
      // Se não estiver, redireciona para a página de login
      console.log("Usuário não autenticado. Redirecionando para o login...");
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica se a rota requer alguma permissão específica
    const roles = route.data && route.data['roles'];
    console.log("vai validar aqui o role " + roles)
    if (roles && roles.length > 0) {
      console.log("entrou na validação de permissao")
      // Se a rota requer permissões, verifica se o usuário possui a permissão necessária
      const hasPermission = roles.some((role: string) => this.authService.hasRole(role));
      console.log("tem permissao? " + hasPermission)
      if (!hasPermission) {
        // Se o usuário não tem permissão, redireciona para uma página de acesso negado
        console.log("diz que n tem permissao e mande pra pagina de acesso negado")
        // this.router.navigate(['/login']);
        this.presentToast()
        return false;
      }
    }

    // Se o usuário está autenticado e tem as permissões necessárias, permite o acesso à rota
    console.log("permitiu acesso")
    return true;
  };
}