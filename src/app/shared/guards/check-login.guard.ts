import { RespuestaLogin } from '../models/usuarios.interface';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { take, map } from 'rxjs/operators';
import router from '../../../../API/src/routes/auth';

@Injectable({
    providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
    constructor(private authSvc: AuthService, router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authSvc.user$.pipe(
            take(1),
            map((user: RespuestaLogin) => (!user ? true : false))
        );
    }
}
