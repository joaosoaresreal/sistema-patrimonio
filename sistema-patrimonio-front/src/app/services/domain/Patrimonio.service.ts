import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";
import { PatrimonioDTO } from "src/app/models/PatrimonioDTO";

@Injectable()
export class PatrimonioService {

    constructor(public http: HttpClient) { }

    // LISTAGEM DOS PATRIMONIOS (GERAL - ATIVOS E BAIXADOS)
    findAll(): Observable<PatrimonioDTO[]> {
        return this.http.get<PatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_patrimonio`)
    }

    // CADASTRO DE PATRIMONIO
    insert(patrimonio: any) {
        return this.http.post(`${API_CONFIG.baseUrl}/api_patrimonio`, patrimonio, {
            observe: 'response', responseType: 'text'
        })
    }

    // EDITAR PATRIMONIO
    update(patrimonio: any) {
        return this.http.put(`${API_CONFIG.baseUrl}/api_patrimonio/${patrimonio.id}`, patrimonio, {
            observe: 'response', responseType: 'text'
        })
    }

    transferencia(patrimonio: any, departamento: any) {
        return this.http.put(`${API_CONFIG.baseUrl}/api_patrimonio/transferencia/${patrimonio.id}/${departamento.id}`, {
            observe: 'response', responseType: 'text'
        })
    }

    // BUSCAR POR ID
    findById(id: number): Observable<PatrimonioDTO> {
        return this.http.get<PatrimonioDTO>(`${API_CONFIG.baseUrl}/api_patrimonio/${id}`)
    }

    // EXLUIR PATRIMONIO
    delete(id: number) {
        return this.http.delete(`${API_CONFIG.baseUrl}/api_patrimonio/${id}`)
    }

    // BUSCA PELA PLAQUETA
    findByPlaqueta(plaqueta: string): Observable<PatrimonioDTO> {
        return this.http.get<PatrimonioDTO>(`${API_CONFIG.baseUrl}/api_patrimonio/plaqueta/${plaqueta}`)
    }

    // LISTAGEM DOS PATRIMONIOS ATIVOS
    findByAtivos(): Observable<PatrimonioDTO[]> {
        return this.http.get<PatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_patrimonio/ativos`)
    }

    // LISTAGEM DOS PATRIMONIOS ATIVOS POR DEPARTAMENTO
    findAtivosByDepartamento(id: number): Observable<PatrimonioDTO[]> {
        return this.http.get<PatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_patrimonio/ativos/${id}`)
    }

    // BAIXA PATRIMONIO
    baixa(id: number, dados: any) {
        return this.http.put(`${API_CONFIG.baseUrl}/api_patrimonio/baixa/${id}`, dados, {
            observe: 'response', responseType: 'text'
        })
    }
}