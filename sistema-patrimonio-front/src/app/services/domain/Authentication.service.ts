import { Injectable } from "@angular/core";
import { usuariosValidos } from "src/app/models/AuthDTO";

@Injectable()
export class AuthenticationService {

    private usuarioLogado: { usuario: string, role: string } | null = null;

    async validaLogin(usuario: string, senha: string) {
        const usuarioValido = usuariosValidos.find(
            user => user.usuario === usuario && user.senha === senha
        );

        // Se o usuário for encontrado, retorne verdadeiro (credenciais válidas)
        if (usuarioValido) {
            this.usuarioLogado = { usuario: usuarioValido.usuario, role: usuarioValido.role };
            console.log("usuario valido", usuarioValido.role)

            // Armazena o nome, email e id para exibir na home, appbar e navbar
            const userData = { usuario: usuarioValido.nome, email: usuarioValido.usuario, id: usuarioValido.id };
            localStorage.setItem('userData', JSON.stringify(userData));

            return { valido: true, role: usuarioValido.role };
        } else {
            console.log("usuario nao cadastrado")
            return { valido: false, role: "" };
        }
    }

    isAuthenticated(): boolean {
        const autorizado = JSON.parse(localStorage.getItem('currentUser') || '{}')
        console.log("esta dentro do isAuthenticated ")
        // if(this.usuarioLogado){
        //     console.log("entrou no if de true ")
        //     return true
        // } 
        console.log(autorizado)
        // return false
        return autorizado.valido === true
    }

    hasRole(role: string): boolean {
        console.log("entrou no hasRole");
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        console.log(currentUser);
        return currentUser.role === role;
    }


}
