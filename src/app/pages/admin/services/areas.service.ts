import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ReqResResponseAreas } from '@app/shared/models/';
import { map } from "rxjs/operators";
import { Area } from '../../../shared/models/areas.interface';

@Injectable({
    providedIn: 'root'
})
export class AreasService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<ReqResResponseAreas> {
        return this.http
            .get<ReqResResponseAreas>(`${environment.API_URL}/api/areas/traertodas`)
    }

    getAllForUser(): Observable<ReqResResponseAreas> {
        return this.http
            .get<ReqResResponseAreas>(`${environment.API_URL}/api/areas/traerAreasPorUsuario`)
    }

    new(area: Area): Observable<ReqResResponseAreas> {
        return this.http
            .post<ReqResResponseAreas>(`${environment.API_URL}/api/areas/crear`, area)
    }

    update(idArea: number, area: Area): Observable<ReqResResponseAreas> {
        return this.http
            .put<ReqResResponseAreas>(`${environment.API_URL}/api/areas/actualizar/${idArea}`, area)
    }

    delete(idArea: number): Observable<ReqResResponseAreas> {
        return this.http
            .delete<ReqResResponseAreas>(`${environment.API_URL}/api/areas/eliminar/${idArea}`)
    }

    //metodo que captura error
    handlerError(error): Observable<never> {
        let errorMessage = 'Error unknown';
        if (error) {
            errorMessage = `Error ${error.message}`;
        }
        window.alert(errorMessage);
        console.log("error", error)
        return throwError(errorMessage);
    }
}