import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';

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
    private auth: AuthenticationService
  ) { }

  ionViewWillEnter(){
    this.menu.enable(false) // O MENU NÃO VAI ABRIR NA TELA DE LOGIN
  }

  ionViewWillLeave(){
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


  async logar(){
    const loginInfo = await this.auth.validaLogin(this.login.usuario, this.login.senha);
    if(loginInfo.valido === true){
      localStorage.setItem('currentUser', JSON.stringify(loginInfo));
      // console.log(localStorage)
      this.nav.navigateForward('home')
    } else{
      this.presentToast()
    }
    // if(this.login.usuario==='sstech@sstech.com' && this.login.senha==='ifms12345678'){
    //   this.nav.navigateForward('home')
    // }else{
    //   this.presentToast()
    // }
  }

  abrirPagina(page: string){
    this.nav.navigateForward(page)
  }


  /********************************************************\
                EXIBIR/OCULTAR SENHA
  \********************************************************/
  verSenha(){
    this.typeSenha = (this.typeSenha === 'password') ? 'text' : 'password';
  }


  ngOnInit() {
  }

}
