import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DepartamentoNomeDTO } from 'src/app/models/DepartamentoNomeDTO';
import { DepartamentoService } from 'src/app/services/domain/Departamento.service';
import { PatrimonioService } from 'src/app/services/domain/Patrimonio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-patrimonio',
  templateUrl: './cadastrar-patrimonio.page.html',
  styleUrls: ['./cadastrar-patrimonio.page.scss'],
})
export class CadastrarPatrimonioPage implements OnInit {

  patrimonioForm!: FormGroup
  departamentos!: DepartamentoNomeDTO[]

  plaqueta: any

  constructor(private formBuilder: FormBuilder, private patrimonioService: PatrimonioService,
    private departamentoService: DepartamentoService, private alertController: AlertController, public nav: NavController) { }

  /********************************************************\
                  SALVA O FORMULÁRIO
  \********************************************************/
  submit() {
    if(this.patrimonioForm.invalid || this.patrimonioForm.pending){
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    let patrimonio = {
      'plaqueta': this.plaqueta, // Envia a plaqueta em UpperCase para o banco
      'descricao': this.patrimonioForm.value.descricao,
      'estado': this.patrimonioForm.value.estado,
      'localizacao': this.patrimonioForm.value.localizacao,
      'dataEntrada': this.patrimonioForm.value.dataEntrada,
      'observacao': this.patrimonioForm.value.observacao,
      'departamento':{
        'id': this.patrimonioForm.value.departamento,
      }
    }

    console.log(patrimonio)

    this.patrimonioService.insert(patrimonio).subscribe({next: (response)=>
       this.alerta(),
       error: (error)=> console.log(error)
    })
  }

  /********************************************************\
                    LISTAGEM DOS DEPARTAMENTOS
  \********************************************************/
  ionViewDidEnter() { /* Disparado quando o roteamento do componente está prestes a ser animado e exibido. */
    this.departamentoService.findByNomeSQL().subscribe({next: (response)=>
      this.departamentos = response, 
      error: (error) => console.log(error)
  })
  }

  /********************************************************\
                VERIFICAR SE PATRIMONIO JA 
                ESTA CADASTRADO NO SISTEMA
  \********************************************************/
  verificaPlaqueta(){
    let plaquetaInserida = this.patrimonioForm.value.plaqueta.toUpperCase()
    this.patrimonioForm.get('plaqueta')?.setValue(plaquetaInserida)
    this.plaqueta = plaquetaInserida

    this.patrimonioService.findByPlaqueta(plaquetaInserida).subscribe((response) => {
      if (response.id >= 1) {
        this.alertaPlaqueta(response.id) // Se o CPF já existe, exiba o alerta e envia o 'id' para poder fazer o método de edição
      }
    }
    )
  }

  alertaPlaqueta(id: number){
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: 'ATENÇÃO',
      text: 'A plaqueta inserida já está cadastrada no sistema, deseja editar o cadastro?',
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
        this.nav.navigateForward(`editar-patrimonio/${id}`)
      } else if (
        result.dismiss === Swal.DismissReason.cancel // Se o resultado for 'NÃO', faça isso
      ) {
        this.nav.navigateForward('listagem-patrimonios')
      }
    })
  }

  ngOnInit() {
    this.patrimonioForm = this.formBuilder.group({
      plaqueta: ['', Validators.required],
      descricao: ['', Validators.required],
      estado: ['', Validators.required],
      localizacao: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      observacao: [''],
      departamento: ['', Validators.required]
    })
  }

  /********************************************************\
                  MENSAGEM DE ALERTA 
  \********************************************************/
  alerta() {
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: 'SUCESSO',
      text: 'O cadastro do patrimônio foi incluido no sistema. Deseja cadastrar outro patrimônio?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'SIM',
      cancelButtonText: 'NÃO',
      // Customizção
      confirmButtonColor: 'var(--ion-color-success-tint)',
      cancelButtonColor: 'var(--ion-color-danger-tint)',
      backdrop: `linear-gradient(#a24b7599 100%, transparent 555%)`
    }).then((result) => {
      if (result.isConfirmed) { // Se o resultado for 'SIM', faça isso
        window.location.reload()
      } else if (
        result.dismiss === Swal.DismissReason.cancel // Se o resultado for 'NÃO', faça isso
      ) {
        this.nav.navigateForward('listagem-patrimonios')
      }
    })
  }

}
