import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";
import { UsuarioDTO } from "src/app/models/UsuarioDTO";

@Injectable()
export class UsuarioService{
    constructor(public http: HttpClient){}

    // LISTAGEM DOS USUARIOS
    findAll(): Observable<UsuarioDTO[]>{
        return this.http.get<UsuarioDTO[]>(`${API_CONFIG.baseUrl}/api_usuarios`)
    }

    // CADASTRO DOS USUARIOS
    insert(usuario: UsuarioDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/api_usuarios`, usuario, {
            observe: 'response', responseType: 'text'
        })
    }
}