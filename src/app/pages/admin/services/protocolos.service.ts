import { Injectable } from '@angular/core';
import { Protocolo, ReqResponseProtocolos } from '../../../shared/models';
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

    postCrearProtocolo(protocolo: Protocolo): Observable<ReqResponseProtocolos> {
        return this.http.post<ReqResponseProtocolos>(`${environment.API_URL}/api/protocolos/crear`, protocolo);
    }

    putActualizarProtocolo(idProtocolo: number, protocolo: Protocolo): Observable<ReqResponseProtocolos> {
        return this.http.put<ReqResponseProtocolos>(`${environment.API_URL}/api/protocolos/actualizar/${idProtocolo}`, protocolo);
    }

    eliminarProtocolo(idProtocolo: number): Observable<ReqResponseProtocolos> {
        return this.http.delete<ReqResponseProtocolos>(`${environment.API_URL}/api/protocolos/eliminar/${idProtocolo}`);
    }


}
