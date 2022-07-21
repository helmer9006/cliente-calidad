import { Injectable } from '@angular/core';
import { ReqResponseProtocolos } from '../../../shared/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root'
})
export class ProtocolosService {

    constructor(private http: HttpClient) { }

    getProtocolos(idArea: string, idEspecialidad: string, busqueda: string): Observable<ReqResponseProtocolos> {
        return this.http.get<ReqResponseProtocolos>(`${environment.API_URL}/api/protocolos/traertodos/${idArea}/${idEspecialidad}/${busqueda}`);
    }

}
