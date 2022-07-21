import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    constructor(private spinnerSrv: NgxSpinnerService) { }

    public mostrarSpinner(): void {
        this.spinnerSrv.show();
    }

    public ocultarSpinner(): void {
        this.spinnerSrv.hide();
    }
}
