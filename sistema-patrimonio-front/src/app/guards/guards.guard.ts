import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/domain/Authentication.service';
import { AlertsService } from '../services/alerts/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class Guards {
  constructor(
    private authService: AuthenticationService, 
    private router: Router, 
    private alerta: AlertsService
  ) {}

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
    // Verifica se o usuário está autenticado
    if (!this.authService.isAuthenticated()) {
      // Se não estiver, redireciona para a página de login
      this.alerta.alertaToast('Usuário não autenticado...', 'warning', "alert")
      this.router.navigate(['/login']);
      // window.location.href = '/login'
      return false;
    }

    // Verifica se a rota requer alguma permissão específica
    const roles = route.data && route.data['roles'];
    if (roles && roles.length > 0) {
      // Se a rota requer permissões, verifica se o usuário possui a permissão necessária
      const hasPermission = roles.some((role: string) => this.authService.hasRole(role));

      // Se o usuário não tem permissão, manda um aviso
      if (!hasPermission) {
        this.alerta.alertaToast('Você não possui permissão para esse acesso', 'warning', "warning")
        return false;
      }
    }

    // Se o usuário está autenticado e tem as permissões necessárias, permite o acesso à rota
    return true;
  };
}