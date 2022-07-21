import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SpinnerService } from '../services/spinner.service';

@Injectable({
    providedIn: 'root'
})

export class SpinnerInterceptorService implements HttpInterceptor {

    constructor(private spinnerSrv: SpinnerService) { }

    //interceptar la peticion para  mostrar el spinner
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerSrv.mostrarSpinner();
        return next.handle(req).pipe(
            finalize(() => this.spinnerSrv.ocultarSpinner())
        );
    }

}
