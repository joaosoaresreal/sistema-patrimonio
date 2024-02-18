import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meu-usuario',
  templateUrl: './meu-usuario.page.html',
  styleUrls: ['./meu-usuario.page.scss'],
})
export class MeuUsuarioPage implements OnInit {

  meuUsuarioForm!: FormGroup

  iconSenhaAtual = "eye"
  typeSenhaAtual = "password"
  iconNovaSenha = "eye"
  typeNovaSenha = "password"
  iconConfirmacaoSenha = "eye"
  typeConfirmacaoSenha = "password"


  constructor(private formBuilder: FormBuilder) { }

  submit() {

  }


  /********************************************************\
                EXIBIR/OCULTAR SENHA
  \********************************************************/
  verSenhaAtual() {
    if (this.typeSenhaAtual === "password") {
      this.iconSenhaAtual = "eye-off"
      this.typeSenhaAtual = "text"
    } else {
      this.typeSenhaAtual = "password"
      this.iconSenhaAtual = "eye"
    }
  }

  verNovaSenha() {
    if (this.typeNovaSenha === "password") {
      this.iconNovaSenha = "eye-off";
      this.typeNovaSenha = "text";
    } else {
      this.typeNovaSenha = "password";
      this.iconNovaSenha = "eye";
    }
  }

  verConfirmacaoSenha() {
    if (this.typeConfirmacaoSenha === "password") {
      this.iconConfirmacaoSenha = "eye-off";
      this.typeConfirmacaoSenha = "text";
    } else {
      this.typeConfirmacaoSenha = "password";
      this.iconConfirmacaoSenha = "eye";
    }
  }

  /********************************************************\
  |********************************************************|
  \********************************************************/
  ngOnInit() {
    this.meuUsuarioForm = this.formBuilder.group({
      foto: [],
      email: [''],
      senhaAtual: [''],
      novaSenha: [''],
      novaSenhaConfirmacao: ['']
    })
  }

}
