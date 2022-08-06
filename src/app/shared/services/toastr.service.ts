import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class ToastrCustomService {

    constructor(private toastr: ToastrService) {
    }


    showSuccess(msj) {
        this.toastr.success(msj, '¡Éxito!',
            {
                easeTime: 1000,
                tapToDismiss: true,
                timeOut: 3000,
            });
    }

    // toast for 30 seconds
    showSuccessCustomTimeOut(msj) {
        this.toastr.success(msj, '¡Éxito!', {
            timeOut: 100000,
            extendedTimeOut: 100000,
            closeButton: true,
            tapToDismiss: false,
        });
    }

    showError(msj, title = '¡Oops!') {
        this.toastr.error(msj, title,
            {
                // progressBar: true,
                easeTime: 1000,
                tapToDismiss: true,
                timeOut: 3000,

            });
    }

    showWarning(msj, title = '¡Importante!') {
        this.toastr.warning(msj, title,
            {
                easeTime: 1000,
                tapToDismiss: true,
                timeOut: 3000,
            });
    }

    showInfo(msj) {
        this.toastr.info(msj, '¡Información!',
            {
                easeTime: 1000,
                tapToDismiss: true,
                timeOut: 3000,
            });
    }

    closeAll() {
        this.toastr.clear();
    }



}
