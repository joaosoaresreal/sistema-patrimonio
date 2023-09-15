import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";
import { DepartamentoDTO } from "src/app/models/DepartamentoDTO";

@Injectable()
export class DepartamentoService{
    constructor(public http: HttpClient){}

    findAll(): Observable<DepartamentoDTO[]>{
        return this.http.get<DepartamentoDTO[]>(`${API_CONFIG.baseUrl}/api_departamentos`)
    }
}