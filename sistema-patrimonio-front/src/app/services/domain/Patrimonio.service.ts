import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";
import { PatrimonioDTO } from "src/app/models/PatrimonioDTO";

@Injectable()
export class PatrimonioService{

    constructor(public http: HttpClient){}

    findAll() : Observable<PatrimonioDTO[]>{
        return this.http.get<PatrimonioDTO[]>(`${API_CONFIG.baseUrl}/api_patrimonio`)
    }
}