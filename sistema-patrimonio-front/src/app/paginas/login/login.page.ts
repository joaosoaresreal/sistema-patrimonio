import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  typeSenha = 'password'

  protected login = {
    usuario: "",
    senha: ""
  }

  constructor(
    public nav: NavController,
    private toast: ToastController,
    public menu: MenuController,
    private auth: AuthenticationService,
    public usuarioService: UsuarioService
  ) { }

  ionViewWillEnter() {
    this.menu.enable(false) // O MENU NÃO VAI ABRIR NA TELA DE LOGIN
  }

  ionViewWillLeave() {
    this.menu.enable(true) // O MENU VAI APARECER NAS OUTRAS TELAS
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Usuário ou Senha incorretos',
      duration: 5000,
      color: 'tertiary',
      position: 'top',
    });

    await toast.present();
  }


  async logar() {
    let dados = {
      'email': this.login.usuario,
      'senha': this.login.senha
    }

    console.log(dados)

    this.auth.authenticateUser(dados).subscribe({
      next: (response: HttpResponse<any>) => {
        const responseBody = JSON.parse(response.body); // Analisa o JSON do corpo da resposta
        const token = responseBody.token; // Obtém o token do corpo da resposta
        // console.log(response)
        console.log("token: " + token)
        localStorage.setItem('token', token);
        const dadosUser = this.auth.dadosUsuario()
        // const role = this.auth.hasRole(dadosUser.roleUsuario)
        // console.log("dados no login: ", this.auth.dadosUsuario())
        // console.log("role no login.page.ts: ", role)
        this.nav.navigateForward('home')
      },
      error: (error) => this.presentToast()
    })

    // const loginInfo = await this.auth.validaLogin(this.login.usuario, this.login.senha);
    // if(loginInfo.valido === true){
    //   localStorage.setItem('currentUser', JSON.stringify(loginInfo));
    //   // console.log(localStorage)
    //   this.nav.navigateForward('home')
    // } else{
    //   this.presentToast()
    // }

  }

  // dadosUsuario(email: string) {
  //   let dadosUsuarioLogado = {
  //     id: 0,
  //     nome: '',
  //     email: '',
  //     foto: '',
  //     roles: '',
  //     idDepto: 0,
  //     nomeDepto: ''
  //   }

  //   this.usuarioService.findByEmail(email).subscribe({
  //       next: (response) => {
  //         dadosUsuarioLogado.id = response.id,
  //         dadosUsuarioLogado.nome = response.nome,
  //         dadosUsuarioLogado.foto = response.foto,
  //         dadosUsuarioLogado.email = response.email,
  //         dadosUsuarioLogado.roles = response.roles.authority,
  //         dadosUsuarioLogado.idDepto = response.departamento.id,
  //         dadosUsuarioLogado.nomeDepto = response.departamento.nome
  //           console.log(dadosUsuarioLogado.email)
  //         // console.log("dadosUsuarioLogado: " + dadosUsuarioLogado)
  //       }, error: (error) => console.log(error)
  //   })

  // }

  abrirPagina(page: string) {
    this.nav.navigateForward(page)
  }


  /********************************************************\
                EXIBIR/OCULTAR SENHA
  \********************************************************/
  verSenha() {
    this.typeSenha = (this.typeSenha === 'password') ? 'text' : 'password';
  }


  ngOnInit() {
  }

}
