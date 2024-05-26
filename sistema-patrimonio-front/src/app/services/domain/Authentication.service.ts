import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/app/config/api.config";
// import { UsuarioService } from "./Usuario.service";
import { jwtDecode } from "jwt-decode";
// import { usuariosValidos } from "src/app/models/AuthDTO";

@Injectable()
export class AuthenticationService {

    constructor(
        public http: HttpClient
    ) { }

    // METODO QUE FARÁ O LOGIN E RETORNARÁ O TOKEN
    authenticateUser(user: any) {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, user, {
            observe: 'response', responseType: 'text'
        })
    }

    dadosUsuario():any {
        interface MyJwtPayload {
            sub: string; // email do usuario
            dados: string; // String JSON contendo os dados do usuário
            roles: string[]; // roles do usuario
        }

        const token = localStorage.getItem('token'); // Obtém o token armazenado localmente

        if(token) {
            const decodedToken = jwtDecode<MyJwtPayload>(token); // Decodifica o token
            // console.log("sub (email): " + decodedToken.sub); // Exibe o payload decodificado no console
            // console.log("aud (indefinido): " + decodedToken.aud); // Exibe o payload decodificado no console
            // console.log("exp: " + decodedToken.exp); // Exibe o payload decodificado no console
            // console.log("iss: " + decodedToken.iss); // Exibe o payload decodificado no console
            // console.log("nbf: " + decodedToken.nbf); // Exibe o payload decodificado no console
            // console.log("iat: " + decodedToken.iat); // Exibe o payload decodificado no console
            // console.log("nbf", decodedToken.dados)

            // console.log("sub (email): " + decodedToken.sub);
            // console.log("dados: " + decodedToken.dados)

            const dadosUsuario = JSON.parse(decodedToken.dados);
            // const roleUsuario = JSON.parse(decodedToken.roles);
            // console.log("dados: " + dadosUsuario);
            // console.log("roles: " + roleUsuario);
            // console.log("roles direto: " + decodedToken.roles);
            // console.log("departamentoNome: " + dadosUsuario.departamentoNome);
            return{
                'emailUsuario': decodedToken.sub,
                'nomeUsuario': dadosUsuario.nomeUsuario,
                'departamentoNome': dadosUsuario.departamentoNome,
                'fotoUsuario': dadosUsuario.foto,
                'roleUsuario': decodedToken.roles
            }

            // Faça o que precisar com os dados do usuário
        }
        // this.usuarioService.findByEmail(email).subscribe({
        //     next: (response) => {
        //         response
        //     }, error: (error) => console.log(error)
        // })
    }


    hasRole(role: any) {
        // console.log("entrou no hasRole");
        // const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        // console.log(currentUser);
        // return currentUser.role === role;

        // Valida qual o ROLE do usuário
        if (role == "admin"){
            console.log("admin? ", this.dadosUsuario().roleUsuario.some((role:string) => role.includes("ADMIN")))
            console.log("vendo o role: ", this.dadosUsuario().roleUsuario)
            return this.dadosUsuario().roleUsuario.some((role:string) => role.includes("ADMIN"))
        } else if(role == "user") {
            console.log("User? ", this.dadosUsuario().roleUsuario.some((r:string) => r.includes("OPERADOR")))
            return this.dadosUsuario().roleUsuario.some((r:string) => r.includes("OPERADOR"))
        } 

        return false
    }


}
