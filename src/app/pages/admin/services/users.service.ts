import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ReqResResponseUsuarios, ReqResponseCambioClave } from '@app/shared/models';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) { }


    getAll(): Observable<ReqResResponseUsuarios> {
        return this.http.get<ReqResResponseUsuarios>(`${environment.API_URL}/api/usuarios/traertodos`)
    }

    getById(userId: number): Observable<ReqResResponseUsuarios> {
        return this.http
            .get<any>(`${environment.API_URL}/api/usuarios/traer/${userId}`)
    }

    new(user: ReqResResponseUsuarios): Observable<ReqResResponseUsuarios> {
        return this.http
            .post<ReqResResponseUsuarios>(`${environment.API_URL}/api/usuarios/crear`, user)
    }

    update(userId: number, user: ReqResResponseUsuarios): Observable<ReqResResponseUsuarios> {
        return this.http
            .put<ReqResResponseUsuarios>(`${environment.API_URL}/api/usuarios/actualizar/${userId}`, user)
    }

    changePass(data: ReqResponseCambioClave): Observable<ReqResponseCambioClave> {
        return this.http
            .put<ReqResponseCambioClave>(`${environment.API_URL}/api/usuarios/cambiarclave`, data)
    }

    delete(userId: number): Observable<ReqResResponseUsuarios> {
        return this.http
            .delete<ReqResResponseUsuarios>(`${environment.API_URL}/api/usuarios/eliminar/${userId}`)
    }

    changeStatus(userId: number): Observable<ReqResResponseUsuarios> {
        return this.http
            .get<ReqResResponseUsuarios>(`${environment.API_URL}/api/usuarios/cambiarestado/${userId}`)
    }
    changeImage(body: any): Observable<any> {
        return this.http.put<any>(`${environment.API_URL}/api/usuarios/cambiarfoto`, body)
    }

    getUserByName(text: string): Observable<ReqResResponseUsuarios> {
        return this.http
            .get<ReqResResponseUsuarios>(`${environment.API_URL}/api/usuarios/traerPorNombre/${text}`)
    }


}
