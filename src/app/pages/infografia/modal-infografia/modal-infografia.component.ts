import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { DocumentosService } from '../../admin/services/documentos.service';
import { ToastrCustomService } from '../../../shared/services/toastr.service';
import { InfografiasService } from '../../admin/services/infografias.service';

enum Action {
    EDIT = 'edit',
    NEW = 'new',
}


@Component({
    selector: 'app-modal-infografia',
    templateUrl: './modal-infografia.component.html',
    styleUrls: ['./modal-infografia.component.scss']
})
export class ModalInfografiaComponent implements OnInit, OnDestroy {
    errorMessage = "";
    private subscription: Subscription = new Subscription();
    fileName = '';
    public archivos: any = [];
    public loading: boolean;
    color: string = "basic";
    actionTODO = Action.NEW;
    visualizarImagenInforgafía: any;


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private MatDialog: MatDialog,
        private cargarDocSvc: DocumentosService,
        private toastr: ToastrCustomService,
        private infografiasSvc: InfografiasService,
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    //FORMULARIO REACTIVO

    //crear campos de formulario infografía para validar
    FormInfografias = this.fb.group({
        descripcion: ['', [Validators.required]],
        url: ['', [Validators.required]],
    });




    //metodo pasado a los campos para validar los campos
    checkField(field: string): boolean {
        return this.isValidField(field);
    }

    //metodo para validar campos
    isValidField(field: string): boolean {
        this.getErrorMessage(field);
        return (
            (this.FormInfografias.get(field).touched || this.FormInfografias.get(field).dirty) &&
            !this.FormInfografias.get(field).valid
        );
    }

    //metodo para obtener mensaje de error
    private getErrorMessage(field: string): void {
        const { errors } = this.FormInfografias.get(field);
        if (errors) {
            const minlenght = errors?.minlength?.requiredLength;
            const messages = {
                required: 'Debes ingresar un valor.',
            };

            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }

    }


    //Metodo que captura el archivo imagen
    onFileSelected(event) {
        console.log(event);
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            this.archivos.push(file)

            this.subirArchivo();
        }
    }

    //Metodo para subir archivo
    subirArchivo(): any {
        try {
            this.loading = true;
            const formularioDeDatos = new FormData();
            this.archivos.forEach(archivo => {
                formularioDeDatos.append('file', archivo)
            })
            this.cargarDocSvc.createDocumento(formularioDeDatos, "imagenes")
                .subscribe(res => {
                    if (res.status) {
                        this.toastr.showSuccess(res.msg);
                        this.loading = false;
                        this.FormInfografias.get("url").setValue(res.response.url);
                        this.visualizarImagenInforgafía = res.response.url;
                        this.color = "primary";
                    } else {
                        this.toastr.showError(res.msg);
                    }
                }, () => {
                    this.loading = false;
                    this.toastr.showError('Error');
                })
        } catch (e) {
            this.loading = false;
            console.log('ERROR', e);
        }
    }

    //Metodo para guardar o editar área
    onSave(): void {
        const formValue = this.FormInfografias.value;
        if (this.actionTODO === Action.NEW) {
            this.infografiasSvc.new(formValue).subscribe((res) => {
                if (res.status) {
                    this.toastr.showSuccess(res.msg);
                    this.MatDialog.closeAll();
                } else {
                    this.toastr.showError(res.msg);
                }
            });
        } else {
            // const areaId = this.data?.area?.id;
            // this.infografiasSvc.update(areaId, formValue).subscribe((res) => {
            //     if (res.status) {
            //         this.toastr.showSuccess(res.msg);
            //         this.MatDialog.closeAll();
            //     } else {
            //         this.toastr.showError(res.msg);
            //     }
            // });
        }
    }

}
