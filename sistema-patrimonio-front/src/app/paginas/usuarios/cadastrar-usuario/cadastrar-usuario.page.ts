import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/domain/Usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  usuarioForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

  submit() {
    if(this.usuarioForm.invalid || this.usuarioForm.pending){
      return // CANCELA A SUBMISSAO E RETORNA OS ERROS PARA O USUÁRIO
    }

    console.log(this.usuarioForm.value)

    this.usuarioService.insert(this.usuarioForm.value).subscribe(response => {
      console.log("salvo")
    }, error=>{
      console.log(error)
    })
  }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      foto: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      departamento: {
        id: 1
      }
    })
  }

}
