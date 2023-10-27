import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
  },

  /********************************************************\
                            PATRIMONIO 
  \********************************************************/
  {
    path: 'listagem-patrimonios',
    loadChildren: () => import('./paginas/patrimonio/listagem-patrimonios/listagem-patrimonios.module').then( m => m.ListagemPatrimoniosPageModule)
  },
  {
    path: 'cadastrar-patrimonio',
    loadChildren: () => import('./paginas/patrimonio/cadastrar-patrimonio/cadastrar-patrimonio.module').then( m => m.CadastrarPatrimonioPageModule)
  },
  {
    path: 'transferir-patrimonio/:id',
    loadChildren: () => import('./paginas/patrimonio/transferir-patrimonio/transferir-patrimonio.module').then( m => m.TransferirPatrimonioPageModule)
  },
  {
    path: 'baixar-patrimonio',
    loadChildren: () => import('./paginas/patrimonio/baixar-patrimonio/baixar-patrimonio.module').then( m => m.BaixarPatrimonioPageModule)
  },
  {
    path: 'editar-patrimonio/:id',
    loadChildren: () => import('./paginas/patrimonio/editar-patrimonio/editar-patrimonio.module').then( m => m.EditarPatrimonioPageModule)
  },

  /********************************************************\
                            USUARIO 
  \********************************************************/
  {
    path: 'listagem-usuarios',
    loadChildren: () => import('./paginas/usuarios/listagem-usuarios/listagem-usuarios.module').then( m => m.ListagemUsuariosPageModule)
  },
  {
    path: 'cadastrar-usuario',
    loadChildren: () => import('./paginas/usuarios/cadastrar-usuario/cadastrar-usuario.module').then( m => m.CadastrarUsuarioPageModule)
  },
  {
    path: 'editar-usuario/:id',
    loadChildren: () => import('./paginas/usuarios/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },

  /********************************************************\
                            DEPARTAMENTO 
  \********************************************************/
  {
    path: 'listagem-departamentos',
    loadChildren: () => import('./paginas/departamento/listagem-departamentos/listagem-departamentos.module').then( m => m.ListagemDepartamentosPageModule)
  },
  {
    path: 'cadastrar-departamento',
    loadChildren: () => import('./paginas/departamento/cadastrar-departamento/cadastrar-departamento.module').then( m => m.CadastrarDepartamentoPageModule)
  },
  {
    path: 'editar-departamento/:id',
    loadChildren: () => import('./paginas/departamento/editar-departamento/editar-departamento.module').then( m => m.EditarDepartamentoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
