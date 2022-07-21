import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class DocumentosService {

    constructor(private http: HttpClient) { }

    public post(url:string, body){
        return this.http.post(url,body); // POST  
      }

    createDocumento(file: any) {
        const queryParams = new HttpParams().append("file", file);
        console.log("queryParams", queryParams)
        const url = `${environment.API_URL}/api/documentos/cargar/imagenes`;
        return this.http.post(url, { params: queryParams })

    }
}
export interface ReqResponseDocumentos {
    stattus: boolean;
    response: documento;
    msg: string;
}

export interface documento {
    url: string;
}