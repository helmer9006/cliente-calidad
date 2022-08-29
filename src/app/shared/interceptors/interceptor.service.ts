import { forwardRef, Inject, Injectable } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    constructor(@Inject(forwardRef(() => AuthService)) private authSvc: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //interceptar la peticion y agrega token
        if (!req.url.includes('api/auth')) {
            const userValue = this.authSvc.userValue;
            const reqClone = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${userValue?.response?.token}`,
                    // "Content-Type": "application/json",
                    // "Content-Type": "multipart/form-data",
                },
            });
            return next.handle(reqClone).pipe(
                catchError(this.controlarError)
            )
        }
        return next.handle(req).pipe(
            catchError(this.controlarError)
        )
    }
    //interceptar la peticion y agrega e identifica errores
    controlarError(error): Observable<never> {
        let errorMessage = 'Error desconocido';
        console.log("error", error);
        if (error.error.status == false) {
            if (error.error.response?.length > 0) {
                //TODO: con toastr hacer array para mostrar multiplres erroes si es el caso con map
                window.alert(error.error.response[0].msg);
            } else {
                window.alert(error.error.msg);
            }
        } else {
            if(error.error?.errores?.length > 0) {
                for(let i of error.error.errores) {
                    window.alert(`${i.msg}`);
                }
            }
            window.alert(`Servidor no disponible.`);
            console.log(`Error en la petición ${error.message}`);
            return;
        }

    }
}