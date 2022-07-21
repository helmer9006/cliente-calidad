import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';
import { map, take, tap } from 'rxjs/operators';
import router from '../../../../API/src/routes/auth';
import { RespuestaLogin } from '../models/usuarios.interface';

@Injectable({
    providedIn: 'root'
})
export class RutasGuard implements CanActivate {
    constructor(private authSvc: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authSvc.user$.pipe(
            take(1),
            map((user: RespuestaLogin) => (user ? true : false))
        );
    }

    // canLoad(
    //     route: Route,
    //     segments: UrlSegment[]): Observable<boolean> | boolean {
    //     console.log("route", route)
    //     console.log("segments", segments)
    //     return this.authSrv.user$.pipe(
    //         take(1),
    //         map((user: any) => {
    //             if (!user) {
    //                 this.router.navigate(['/login']);
    //                 console.log("user", user)
    //                 return user ? true : false
    //             }
    //         })
    //     );
    // }

}
