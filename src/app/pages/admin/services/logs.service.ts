import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class LogsService {

    constructor(private http: HttpClient) { }

    getLogs(body: any): Observable<any> {
        return this.http.post<any>(`${environment.API_URL}/api/usuarios-log`, body)
    }

}
