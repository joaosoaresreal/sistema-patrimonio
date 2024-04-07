import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DepartamentoNomeDTO } from 'src/app/models/DepartamentoNomeDTO';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';
import { CpfValidator } from 'src/app/services/validators/CpfValidator';
import { TelValidator } from 'src/app/services/validators/TelValidator';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  usuarioForm!: FormGroup
  departamentos!: DepartamentoNomeDTO[]
  // arquivo!: File // Guarda a referência da foto selecionado

  public cpfFormatado: any;
  public telFormatado: any;
  // public arquivoPreview: any; // Guarda os bytes obtidos através da leitura

  constructor(
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,
    private usuarioService: UsuarioService,
    public nav: NavController,
    private telValidator: TelValidator,
    private alerta: AlertsService
  ) { }

  /********************************************************\
                  SALVA O FORMULÁRIO
  \********************************************************/
  submit() {
    if (this.usuarioForm.invalid || this.usuarioForm.pending) {
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let usuario = {
      'nome': this.usuarioForm.value.nome,
      'cpf': this.cpfFormatado, // Envia o CPF com formatação para o BackEnd salvar no Banco
      'telefone': this.telFormatado, // Envia o TELEFONE com formatação para o BackEnd salvar no Banco 
      'foto': this.usuarioForm.value.foto,
      'email': this.usuarioForm.value.email,
      'senha': this.usuarioForm.value.senha,
      'departamento': {
        'id': this.usuarioForm.value.departamento
      }
    }

    this.usuarioService.insert(usuario).subscribe({
      next: (response) => {
        this.alerta.alertaAcoes('Cadastro Realizado', 'Deseja cadastrar outro usuário?', 'success', 'SIM', 'NÃO',
        ()=> window.location.reload(), ()=> this.nav.navigateForward('listagem-usuarios'))
      },
      error: (error) => this.alerta.alertaOk('ERRO', 'Não foi possível salvar o cadastro no momento, tente novamente mais tarde ou contate o administrador do sistema',
      'error', 'OK', ()=>this.nav.navigateForward('listagem-usuarios'))
    })
  }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findByNomeSQL().subscribe({
      next: (response) =>
        this.departamentos = response,
      error: (error) => console.log(error)
    })
  }

  /********************************************************\
            VALIDAR SE CPF JÁ ESTA CADASTRADO
              E FORMATAR COM PONTO E TRAÇO
  \********************************************************/
  validaCPF() {
    let formattedCpf = this.usuarioForm.value.cpf.replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4');
    this.cpfFormatado = formattedCpf

    this.usuarioService.findByCpf(formattedCpf).subscribe((response) => {
      if (response.id > 0) {
        this.alertaCpf(response.id) // Se o CPF já existe, exiba o alerta e envia o 'id' para poder fazer o método de edição
      }
    }
    )
  }

  alertaCpf(id: number) {
    this.alerta.alertaAcoes('O CPF inserido já está cadastrado no sistema', 'Deseja editar o cadastro do usuário?', 'warning', 'SIM', 'NÃO',
    ()=>this.nav.navigateForward(`editar-usuario/${id}`), ()=>this.nav.navigateForward('listagem-usuarios'))
  }

  /********************************************************\
                FORMATA NÚMERO DE TELEFONE
  \********************************************************/
  validaTelefone() {
    const telefone = this.usuarioForm.value.telefone
    const telefoneFormatado = this.telValidator.telService(telefone);
    this.usuarioForm.get('telefone')?.setValue(telefoneFormatado)
    
    this.telFormatado = telefoneFormatado
  }

  // /********************************************************\
  //                 FOTO DO USUÁRIO
  // \********************************************************/
  // // https://consolelog.com.br/angular-upload-arquivo-barra-progresso-porcentagem/
  // preview(event: Event) {
  //   const target = event.target as HTMLInputElement;

  //   if (target instanceof HTMLInputElement && target.files && target.files.length > 0) {
  //     const arquivo = target.files[0]; // O navegador fornece acesso ao arquivo através da propriedade 'files' do elemento
  //     console.log(arquivo);

  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       this.arquivoPreview = reader.result;
  //     };

  //     reader.readAsDataURL(arquivo);
  //   }
  // }

  /********************************************************\
                  AÇÕES DE INICIALIZAÇÃO
  \********************************************************/
  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.ValidaCpf])],
      telefone: ['', Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(15)])],
      foto: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      departamento: {
        id: ['', Validators.required]
      }
    })
  }
}
