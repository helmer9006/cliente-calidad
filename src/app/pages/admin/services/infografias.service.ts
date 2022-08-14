import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReqResponseInfografias } from '../../../shared/models/infografias.interface';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
    providedIn: 'root'
})
export class InfografiasService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<ReqResponseInfografias> {
        return this.http
            .get<ReqResponseInfografias>(`${environment.API_URL}/api/infografia/traertodas`)
    }

    new(infografia: any): Observable<ReqResponseInfografias> {
        return this.http
            .post<ReqResponseInfografias>(`${environment.API_URL}/api/infografia/crear`, infografia)
    }

    delete(idInfografia: number): Observable<ReqResponseInfografias> {
        return this.http
            .delete<ReqResponseInfografias>(`${environment.API_URL}/api/infografia/eliminar/${idInfografia}`)
    }

}
