import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { map } from "rxjs/operators";
import { ReqResResponseEspecialidades } from '../../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class EspecialidadesService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<ReqResResponseEspecialidades> {
        return this.http.get<ReqResResponseEspecialidades>(`${environment.API_URL}/api/especialidades/traertodas`)
            .pipe(catchError(this.handlerError));
    }


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
