import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentosService {

    constructor(private http: HttpClient) { }

    public post(url: string, body) {
        return this.http.post(url, body); // POST  
    }

    createDocumento(archivo: any): Observable<any> {
        return this.http.post<any>(`${environment.API_URL}/api/documentos/cargar/imagenes`, archivo)
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