import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { RespuestaLogin, UsuarioAuth, Roles } from '@shared/models/usuarios.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilsService } from '../../shared/services/utils.service';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private user = new BehaviorSubject<RespuestaLogin>(null);

    constructor(private http: HttpClient, private router: Router, private utilsSvc: UtilsService) {
        this.checkToken();
    }
    get user$(): Observable<RespuestaLogin> {
        return this.user.asObservable();
    }

    get userValue(): RespuestaLogin {
        return this.user.getValue();
    }
    login(authData: UsuarioAuth): Observable<RespuestaLogin | void> {
        return this.http
            .post<RespuestaLogin>(`${environment.API_URL}/api/auth`, authData)
            .pipe(
                map((user: RespuestaLogin) => {
                    this.saveLocalStorage(user);
                    this.user.next(user);
                    return user;
                }),
                catchError((err) => this.handlerError(err))
            );
    }

    logout(): void {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
        this.user.next(null);
        this.utilsSvc.openSidebar(false);
    }

    private checkToken(): void {
        const user = JSON.parse(localStorage.getItem('user')) || null;
        if (user) {
            const isExpired = helper.isTokenExpired(user.response.token);
            if (isExpired) {
                window.alert("Sesión caducada");
            }
            isExpired ? this.logout() : this.user.next(user); //si el token está  vencido cerramos sesión
        } else {
            this.logout();
        }

    }

    private saveLocalStorage(user: RespuestaLogin): void {
        const { status, msg, ...rest } = user;
        localStorage.setItem('user', JSON.stringify(rest));
    }

    private handlerError(err): Observable<never> {
        let errorMessage = 'Ocurrió un error al recuperar datos';
        if (err) {
            errorMessage = `Error: code ${err.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
