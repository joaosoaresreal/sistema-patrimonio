import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/app/config/api.config";
import { jwtDecode } from "jwt-decode";
import { tap } from "rxjs";

@Injectable()
export class AuthenticationService {

    constructor(
        public http: HttpClient
    ) { }

    /**
     * Método de Login
     */
    authenticateUser(user: any) {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, user, {
            observe: 'response', responseType: 'text'
        }).pipe(
            tap((response: any) => {
                if (response) {
                    const responseBody = JSON.parse(response.body); // Analisa o JSON do corpo da resposta
                    const token = responseBody.token; // Obtém o token do corpo da resposta

                    // const token = response.body;
                    localStorage.setItem('token', token);
                }
            })
        )
    }

    /**
     * Método de LogOut
     */
    logout() {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    /**
     * Dados do usuário logado
     * (decodificação do token)
     */
    dadosUsuario(): any {
        interface MyJwtPayload {
            sub: string; // email do usuario
            dados: string; // String JSON contendo os dados do usuário
            roles: string[]; // roles do usuario
        }

        const token = localStorage.getItem('token'); // Obtém o token armazenado localmente

        if (token) {
            const decodedToken = jwtDecode<MyJwtPayload>(token); // Decodifica o token
            const dadosUsuario = JSON.parse(decodedToken.dados);

            return { // Retorna os dados decodificados
                'emailUsuario': decodedToken.sub,
                'idUsuario': dadosUsuario.idUsuario,
                // 'nomeUsuario': dadosUsuario.nomeUsuario,
                // 'nickname': dadosUsuario.nickName,
                // 'departamentoId': dadosUsuario.departamentoId,
                // 'departamentoNome': dadosUsuario.departamentoNome,
                // 'fotoUsuario': `${API_CONFIG.baseUrl}/files/${dadosUsuario.foto}`,
                'roleUsuario': decodedToken.roles
            }
        }
    }

    /**
     * Validação do ROLE do usuário para determinar as rotas
     */
    hasRole(role: any) {
        if (role == "admin") {
            return this.dadosUsuario().roleUsuario.some((role: string) => role.includes("ADMIN"))
        } else if (role == "user") {
            return this.dadosUsuario().roleUsuario.some((role: string) => role.includes("OPERADOR"))
        }
        return false
    }

    /**
     * Verifica se o Usuário está ou não autenticado
     */
    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token; // Verifica se o token está presente no localStorage
    }
}
