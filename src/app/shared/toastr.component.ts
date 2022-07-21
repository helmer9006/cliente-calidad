import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class ToastrCustomService {
  constructor(private toastr: ToastrService) {}

  showSuccess(msj) {
    this.toastr.success(msj, "¡Éxito!");
  }

  // toast for 30 seconds
  showSuccessCustomTimeOut(msj) {
    this.toastr.success(msj, "¡Éxito!", {
      timeOut: 100000, 
      extendedTimeOut: 100000,
      closeButton: true,
      tapToDismiss: false   
    });
  }

  showError(msj) {
    this.toastr.error(msj, "¡Oops!");
  }

  showWarning(msj) {
    this.toastr.warning(msj, "¡Importante!");
  }

  showInfo(msj) {
    this.toastr.info(msj);
  }
  closeAll(){
    this.toastr.clear();
  }
}
