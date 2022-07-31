import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { map } from "rxjs/operators";
import { ReqResResponseEspecialidades } from '../../../shared/models';
import { Especialidad } from '../../../shared/models/protocolos.interface';

@Injectable({
    providedIn: 'root'
})
export class EspecialidadesService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<ReqResResponseEspecialidades> {
        return this.http.get<ReqResResponseEspecialidades>(`${environment.API_URL}/api/especialidades/traertodas`)
            .pipe(catchError(this.handlerError));
    }
    new(especialidad: any): Observable<ReqResResponseEspecialidades> {
        return this.http.post<ReqResResponseEspecialidades>(`${environment.API_URL}/api/especialidades/crear`, especialidad)
    }
    update(idEspecialidad: number, especialidad: Especialidad): Observable<ReqResResponseEspecialidades> {
        return this.http.put<ReqResResponseEspecialidades>(`${environment.API_URL}/api/especialidades/actualizar/${idEspecialidad}`, especialidad)
    }

    delete(idEspecialidad: number): Observable<ReqResResponseEspecialidades> {
        return this.http.delete<ReqResResponseEspecialidades>(`${environment.API_URL}/api/especialidades/eliminar/${idEspecialidad}`)
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
