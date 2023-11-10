import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";
import { PatrimonioDTO } from "src/app/models/PatrimonioDTO";

@Injectable()
export class PatrimonioService{

    constructor(public http: HttpClient){}

    // LISTAGEM DOS PATRIMONIOS
    findAll() : Observable<PatrimonioDTO[]>{
        return this.http.get<PatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_patrimonio`)
    }

    // CADASTRO DE PATRIMONIO
    insert(patrimonio: any){
        return this.http.post(`${API_CONFIG.baseUrl}/api_patrimonio`, patrimonio, {
            observe: 'response', responseType: 'text'
        })
    }

    // EDITAR PATRIMONIO
    update(patrimonio: any){
        return this.http.put(`${API_CONFIG.baseUrl}/api_patrimonio/${patrimonio.id}`, patrimonio, {
            observe: 'response', responseType: 'text'
        })
    }

    // BUSCAR POR ID
    findById(id: number):Observable<PatrimonioDTO>{
        return this.http.get<PatrimonioDTO>(`${API_CONFIG.baseUrl}/api_patrimonio/${id}`)
    }

    // EXLUIR PATRIMONIO
    delete(id: number){
        return this.http.delete(`${API_CONFIG.baseUrl}/api_patrimonio/${id}`)
    }

    findByPlaqueta(plaqueta: string):Observable<PatrimonioDTO>{
        return this.http.get<PatrimonioDTO>(`${API_CONFIG.baseUrl}/api_patrimonio/plaqueta/${plaqueta}`)
    }
}