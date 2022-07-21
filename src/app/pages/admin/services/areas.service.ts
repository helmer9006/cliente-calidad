import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ReqResResponseAreas } from '@app/shared/models/';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AreasService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<ReqResResponseAreas> {
        return this.http
            .get<ReqResResponseAreas>(`${environment.API_URL}/api/areas/traertodas`)
            // .pipe(catchError(this.handlerError));
    }

    getAllForUser(): Observable<ReqResResponseAreas> {
        return this.http
            .get<ReqResResponseAreas>(`${environment.API_URL}/api/areas/traerAreasPorUsuario`)
            // .pipe(catchError(this.handlerError));
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