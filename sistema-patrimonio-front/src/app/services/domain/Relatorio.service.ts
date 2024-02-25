import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";

@Injectable({
    providedIn: 'root',
})
export class RelatorioService{
    private apiUrl = `${API_CONFIG.baseUrl}/api_relatorio`;
    constructor(public http: HttpClient){}

    gerarRelatorioTransferencia(dados: any): Observable<HttpResponse<Blob>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${this.apiUrl}/gerar_rel_transf`, dados, {
          headers,
          responseType: 'blob',
          observe: 'response',
        });
    }

    gerarRelatorioBaixa(dados: any): Observable<HttpResponse<Blob>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${this.apiUrl}/gerar_rel_baixa`, dados, {
          headers,
          responseType: 'blob',
          observe: 'response',
        });
    }
}