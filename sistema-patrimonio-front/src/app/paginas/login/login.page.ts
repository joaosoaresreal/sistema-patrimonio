import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // public typeSenha = 'password'
  // typeSenha: 'password' | 'text' = 'password'
  typeSenha = 'password';
  loginForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
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

  /**
   * Login
   */
  submit() {
    let dados ={
      'email': this.loginForm.value.email,
      'senha': this.loginForm.value.senha
    }

    this.auth.authenticateUser(dados).subscribe({
      next: response => {
        // this.nav.navigateForward('home')
        window.location.href = '/home'
      },
      error: (error) => this.presentToast()
    })
  }

  abrirPagina(page: string) {
    this.nav.navigateForward(page)
  }

  /********************************************************\
                EXIBIR/OCULTAR SENHA
  \********************************************************/
  verSenha() {
    console.log("apertou: ")
    this.typeSenha = (this.typeSenha === 'password') ? 'text' : 'password'
    console.log(this.typeSenha)
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }
}
