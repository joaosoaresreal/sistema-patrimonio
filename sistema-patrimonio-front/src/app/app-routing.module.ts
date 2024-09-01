import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Guards } from './guards/guards.guard';
import { AuthenticationService } from './services/domain/Authentication.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  /********************************************************\
                            LOGIN 
  \********************************************************/
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },

  /********************************************************\
                            HOME 
  \********************************************************/
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule),
    canActivate: [Guards],
    data: {roles: ['user', 'admin']}
  },

  /********************************************************\
                            PATRIMONIO 
  \********************************************************/
  {
    path: 'listagem-patrimonios',
    loadChildren: () => import('./paginas/patrimonio/listagem-patrimonios/listagem-patrimonios.module').then( m => m.ListagemPatrimoniosPageModule),
    canActivate: [Guards],
    data: {roles: ['user', 'admin']}
  },
  {
    path: 'cadastrar-patrimonio',
    loadChildren: () => import('./paginas/patrimonio/cadastrar-patrimonio/cadastrar-patrimonio.module').then( m => m.CadastrarPatrimonioPageModule),
    canActivate: [Guards],
    data: {roles: ['user', 'admin']}
  },
  {
    path: 'transferir-patrimonio/:id',
    loadChildren: () => import('./paginas/patrimonio/transferir-patrimonio/transferir-patrimonio.module').then( m => m.TransferirPatrimonioPageModule),
    canActivate: [Guards],
    data: {roles: ['user', 'admin']}
  },
  {
    path: 'baixar-patrimonio/:id',
    loadChildren: () => import('./paginas/patrimonio/baixar-patrimonio/baixar-patrimonio.module').then( m => m.BaixarPatrimonioPageModule),
    canActivate: [Guards],
    data: {roles: ['user', 'admin']}
  },
  {
    path: 'editar-patrimonio/:id',
    loadChildren: () => import('./paginas/patrimonio/editar-patrimonio/editar-patrimonio.module').then( m => m.EditarPatrimonioPageModule),
    canActivate: [Guards],
    data: {roles: ['user', 'admin']}
  },
  {
    path: 'log-alteracao',
    loadChildren: () => import('./paginas/patrimonio/log-alteracao/log-alteracao.module').then( m => m.LogAlteracaoPageModule),
    canActivate: [Guards],
    data: {roles: ['user', 'admin']}
  },

  /********************************************************\
                            USUARIO 
  \********************************************************/
  {
    path: 'listagem-usuarios',
    loadChildren: () => import('./paginas/usuarios/listagem-usuarios/listagem-usuarios.module').then( m => m.ListagemUsuariosPageModule),
    canActivate: [Guards],
    data: {roles:['admin']}
  },
  {
    path: 'cadastrar-usuario',
    loadChildren: () => import('./paginas/usuarios/cadastrar-usuario/cadastrar-usuario.module').then( m => m.CadastrarUsuarioPageModule),
    canActivate: [Guards],
    data: {roles: ['admin']}
  },
  {
    path: 'editar-usuario/:id',
    loadChildren: () => import('./paginas/usuarios/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule),
    canActivate: [Guards],
    data: {roles: ['admin']}
  },
  {
    path: 'meu-usuario',
    loadChildren: () => import('./paginas/usuarios/meu-usuario/meu-usuario.module').then( m => m.MeuUsuarioPageModule),
    canActivate: [Guards],
    data: {roles: ['admin', 'user']}
  },

  /********************************************************\
                            DEPARTAMENTO 
  \********************************************************/
  {
    path: 'listagem-departamentos',
    loadChildren: () => import('./paginas/departamento/listagem-departamentos/listagem-departamentos.module').then( m => m.ListagemDepartamentosPageModule),
    canActivate: [Guards],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'cadastrar-departamento',
    loadChildren: () => import('./paginas/departamento/cadastrar-departamento/cadastrar-departamento.module').then( m => m.CadastrarDepartamentoPageModule),
    canActivate: [Guards],
    data: {roles: ['admin']}
  },
  {
    path: 'editar-departamento/:id',
    loadChildren: () => import('./paginas/departamento/editar-departamento/editar-departamento.module').then( m => m.EditarDepartamentoPageModule),
    canActivate: [Guards],
    data: {roles: ['admin']}
  },

  /********************************************************\
                          Relatorios 
  \********************************************************/
  {
    path: 'relatorios',
    loadChildren: () => import('./paginas/relatorios/relatorios.module').then( m => m.RelatoriosPageModule),
    canActivate: [Guards],
    data: {roles: ['admin', 'user']}
  },

  /********************************************************\
                          Pagina 404 
  \********************************************************/
  {
    path: '**',
    loadChildren: () => import('./paginas/page404/page404.module').then( m => m.Page404PageModule),
    canActivate: [Guards],
    data: {roles: ['admin', 'user']}
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthenticationService, Guards]
})
export class AppRoutingModule {}
