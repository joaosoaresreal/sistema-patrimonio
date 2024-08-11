import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioDTO } from 'src/app/models/UsuarioDTO';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthenticationService } from 'src/app/services/domain/Authentication.service';
import { DadosUser } from 'src/app/services/domain/user/DadosUser';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';
import { TelValidator } from 'src/app/services/validators/TelValidator';

@Component({
  selector: 'app-meu-usuario',
  templateUrl: './meu-usuario.page.html',
  styleUrls: ['./meu-usuario.page.scss'],
})
export class MeuUsuarioPage implements OnInit {

  meuUsuarioForm!: FormGroup
  usuario!: UsuarioDTO

  nomeUsuario: any
  cpfUsuario: any
  emailUsuario: any
  deptoUsuario: any
  fotoAtual: any

  iconSenhaAtual = "eye"
  typeSenhaAtual = "password"
  iconNovaSenha = "eye"
  typeNovaSenha = "password"
  iconConfirmacaoSenha = "eye"
  typeConfirmacaoSenha = "password"

  isModalOpen = false;
  fotoApi?: File
  telFormatado: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private dados: DadosUser,
    private usuarioService: UsuarioService,
    private telValidator: TelValidator,
    private alerta: AlertsService
  ) { }

  submit() {
    const formData = new FormData();

    // Cria um Blob a partir do objeto JSON do usuário
    const usuarioBlob = new Blob([JSON.stringify({
      id: this.meuUsuarioForm.value.id,
      nome: this.meuUsuarioForm.value.nome,
      nickName: this.meuUsuarioForm.value.nickName,
      cpf: this.meuUsuarioForm.value.cpf,
      telefone: this.telFormatado || this.meuUsuarioForm.value.telefone,
      email: this.meuUsuarioForm.value.email,
      departamento: { id: this.meuUsuarioForm.value.departamento }
    })], { type: 'application/json' });

    // Adiciona o Blob ao FormData
    formData.append('usuario', usuarioBlob);

    // Adiciona a foto se estiver selecionada
    if (this.fotoApi) {
      formData.append('file', this.fotoApi);
    }

    // Chama o serviço de atualização passando o FormData e o ID
    this.usuarioService.update(this.meuUsuarioForm.value.id, formData).subscribe({
      next: (response) => {
        console.log(response)
        this.alerta.alertaOk('SUCESSO', 'Seu cadastro foi atualizado', 'success', 'OK', () => {window.location.href = '/home'})
      }, error: (error) => {
        this.alerta.alertaAtencao('ERRO', 'Não foi possivel alterar seu cadastro, tente novamente mais tarde ou contate o administrador do sistema',
          'error', false, 'OK')
      }
    })
  }

  /********************************************************\
                FORMATA NÚMERO DE TELEFONE
  \********************************************************/
  validaTelefone() {
    const telefone = this.meuUsuarioForm.value.telefone
    const telefoneFormatado = this.telValidator.telService(telefone);
    this.meuUsuarioForm.get('telefone')?.setValue(telefoneFormatado)

    this.telFormatado = telefoneFormatado
  }

  // Abre o modal
  abreModalFoto() {
    this.isModalOpen = true;
  }

  // Sair do modal
  fechaModalFoto() {
    this.isModalOpen = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoAtual = e.target.result;
      };
      reader.readAsDataURL(file); // Converte o arquivo em URL de dados
      this.fotoApi = file;
    }
  }

  removeFoto() {
    this.fotoAtual = "/assets/user-icon-logado.png"
    this.fotoApi = undefined
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
    this.usuarioService.findById(this.auth.dadosUsuario().idUsuario).subscribe(response => {
      this.meuUsuarioForm = this.formBuilder.group({
        id: [response.id],
        nome: [response.nome, Validators.required],
        nickName: [response.nickName, Validators.required],
        cpf: [response.cpf, Validators.required],
        telefone: [response.telefone, Validators.required],
        foto: [response.foto],
        email: [response.email, Validators.compose([Validators.required, Validators.email])],
        departamento: [response.departamento.id, Validators.required],
      })

      this.nomeUsuario = response.nome
      this.cpfUsuario = response.cpf
      this.emailUsuario = response.email
      this.deptoUsuario = response.departamento.nome
    })

    this.dados.dadosUsuarioAPI().subscribe(data => {
      this.fotoAtual = data.foto
    });
  }

}
