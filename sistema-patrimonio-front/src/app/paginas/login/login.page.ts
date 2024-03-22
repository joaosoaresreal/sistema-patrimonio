import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // iconSenha = "eye"
  typeSenha = 'password'
  // checked:any

  protected login = {
    usuario: "",
    senha: ""
  }

  constructor(public nav: NavController, private toast: ToastController, public menu: MenuController) { }

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

  
  logar(){

    if(this.login.usuario==='sstech@sstech.com' && this.login.senha==='ifms12345678'){
      this.nav.navigateForward('home')
    }else{
      this.presentToast()
    }
  }
  

  abrirPagina(page: string){
    this.nav.navigateForward(page)
  }


  /********************************************************\
                EXIBIR/OCULTAR SENHA
  \********************************************************/
  verSenha(){
    console.log("clicou");
    this.typeSenha = (this.typeSenha === 'password') ? 'text' : 'password';
  }
  

  ngOnInit() {
  }

}
