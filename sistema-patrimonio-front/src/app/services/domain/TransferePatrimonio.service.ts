import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";
import { TransferePatrimonioDTO } from "src/app/models/TransferePatrimonioDTO";

@Injectable()
export class TransferePatrimonioService {
    constructor(public http: HttpClient) { }

    // Listagem das transferencias
    findAll(): Observable<TransferePatrimonioDTO[]> {
        return this.http.get<TransferePatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_alteracao-patrimonio`)
    }

    // BUSCAR POR ID
    findById(id: number): Observable<TransferePatrimonioDTO> {
        return this.http.get<TransferePatrimonioDTO>(`${API_CONFIG.baseUrl}/api_alteracao-patrimonio/${id}`)
    }

    // Buscar por número da plaqueta
    findByPlaqueta(plaqueta: string): Observable<TransferePatrimonioDTO[]> {
        return this.http.get<TransferePatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_alteracao-patrimonio/plaqueta/${plaqueta}`)
    }

    // Buscar por data de transf
    findByDataHoraModificacaoBetween(startDate: string, endDate: string): Observable<TransferePatrimonioDTO[]> {
        return this.http.get<TransferePatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_alteracao-patrimonio/data?startDate=${startDate}&endDate=${endDate}`)
    }

    // Buscar por plaqueta E data de transf
    findByPlaquetaDataHoraModificacao(plaqueta: string, startDate: string, endDate: string): Observable<TransferePatrimonioDTO[]> {
        return this.http.get<TransferePatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_alteracao-patrimonio/${plaqueta}/data?startDate=${startDate}&endDate=${endDate}`)
    }
}