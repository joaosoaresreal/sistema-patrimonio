import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";
import { DepartamentoDTO } from "src/app/models/DepartamentoDTO";

@Injectable()
export class DepartamentoService {
    constructor(public http: HttpClient) { }

    // LISTAGEM DE DEPARTAMENTO
    findAll(): Observable<DepartamentoDTO[]> {
        return this.http.get<DepartamentoDTO[]>(`${API_CONFIG.baseUrl}/api_departamentos`)
    }

    // CADASTRO DE DEPARTAMENTO
    insert(departamento: any) {
        return this.http.post(`${API_CONFIG.baseUrl}/api_departamentos`, departamento, {
            observe: 'response', responseType: 'text'
        })
    }

    // EDITAR DEPARTAMENTO
    update(departamento: DepartamentoDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/api_departamentos/${departamento.id}`, departamento, {
            observe: 'response', responseType: 'text'
        })
    }

    // BUSCAR POR ID
    findById(id: number): Observable<DepartamentoDTO> {
        return this.http.get<DepartamentoDTO>(`${API_CONFIG.baseUrl}/api_departamentos/${id}`)
    }

    // EXLUIR DEPARTAMENTO
    delete(id: number) {
        return this.http.delete(`${API_CONFIG.baseUrl}/api_departamentos/${id}`)
    }
}