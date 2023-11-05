import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoNomeDTO } from 'src/app/models/DepartamentoNomeDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';
import { CpfValidator } from 'src/app/services/validators/CpfValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  usuarioForm!: FormGroup
  departamentos!: DepartamentoNomeDTO[]
  arquivo!: File // Guarda a referência da foto selecionado

  public cpfFormatado: any;
  public telFormatado: any;
  public arquivoPreview: any; // Guarda os bytes obtidos através da leitura

  constructor(private formBuilder: FormBuilder, private departamentoService: DepartamentoService,
    private usuarioService: UsuarioService, private alertController: AlertController, public nav: NavController) { }

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
      next: (response) =>
        this.alerta(),
      error: (error) => console.log(error)
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
      if (response.id >= 1) {
        this.alertaCpf(response.id) // Se o CPF já existe, exiba o alerta e envia o 'id' para poder fazer o método de edição
      }
    }
    )
  }

  alertaCpf(id: number) {
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: 'ATENÇÃO',
      text: 'O CPF inserido já está cadastrado no sistema, deseja editar o cadastro do usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SIM',
      cancelButtonText: 'NÃO',
      // Customizção
      confirmButtonColor: 'var(--ion-color-success-tint)',
      cancelButtonColor: 'var(--ion-color-danger-tint)',
      backdrop: `linear-gradient(#a24b7599 100%, transparent 555%)`
    }).then((result) => {
      if (result.isConfirmed) { // Se o resultado for 'SIM', faça isso
        this.nav.navigateForward(`editar-usuario/${id}`)
      } else if (
        result.dismiss === Swal.DismissReason.cancel // Se o resultado for 'NÃO', faça isso
      ) {
        this.nav.navigateForward('listagem-usuarios')
      }
    })
  }

  /********************************************************\
                FORMATA NÚMERO DE TELEFONE
  \********************************************************/
  validaTelefone() {
    let telefoneValida = this.usuarioForm.value.telefone

    let r = telefoneValida.replace(/\D/g, ""); // Remove todos os caracteres não numéricos (exceto dígitos)
    r = r.replace(/^0/, ""); // Remove um zero inicial, se houver

    if (r.length >= 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3");
    } else if (telefoneValida.trim() !== "") {
      r = r.replace(/^(\d*)/, "($1");
    }

    this.telFormatado = r // Armazena o telefone formatado
  }

  /********************************************************\
                  FOTO DO USUÁRIO
  \********************************************************/
  // https://consolelog.com.br/angular-upload-arquivo-barra-progresso-porcentagem/
  preview(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target instanceof HTMLInputElement && target.files && target.files.length > 0) {
      const arquivo = target.files[0]; // O navegador fornece acesso ao arquivo através da propriedade 'files' do elemento
      console.log(arquivo);

      const reader = new FileReader();

      reader.onloadend = () => {
        this.arquivoPreview = reader.result;
      };

      reader.readAsDataURL(arquivo);
    }
  }

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

  /********************************************************\
                MENSAGEM DE ALERTA AO SALVAR
  \********************************************************/
  async alerta() {
    const alert = await this.alertController.create({
      header: 'Usuário cadastrado com sucesso',
      message: 'Deseja cadastrar outro usuário?',
      buttons: [
        {
          text: 'SIM',
          role: 'sim',
          handler: () => {
            window.location.reload()
          }
        },
        {
          text: 'NÃO',
          role: 'nao',
          handler: () => {
            this.nav.navigateForward('listagem-usuarios')
          }
        }
      ]
    });

    await alert.present();
  }

}
