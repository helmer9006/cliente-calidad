import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AreasService } from '../../../admin/services/areas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DocumentosService } from '../../../admin/services/documentos.service';
import { ToastrCustomService } from '../../../../shared/services/toastr.service';


enum Action {
    EDIT = 'edit',
    NEW = 'new',
}

@Component({
    selector: 'app-modal-area',
    templateUrl: './modal-area.component.html',
    styleUrls: ['./modal-area.component.scss']
})
export class ModalAreaComponent implements OnInit, OnDestroy {
    errorMessage = "";
    private subscription: Subscription = new Subscription();
    fileName = '';
    public archivos: any = [];
    public loading: boolean;
    color: string = "basic";
    actionTODO = Action.NEW;
    visualizarImagenArea: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private areasSvc: AreasService,
        private fb: FormBuilder,
        private MatDialog: MatDialog,
        private cargarDocSvc: DocumentosService,
        private toastr: ToastrCustomService
    ) { }

    ngOnInit(): void {
        //validar si viene área para editar o es nueva
        if (this.data?.area.hasOwnProperty('id')) {
            this.actionTODO = Action.EDIT;

            this.FormAreas.updateValueAndValidity();
            this.data.title = 'Editar Área';
            this.pathFormData();
            this.visualizarImagenArea = this.FormAreas.get("imagen").value;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    //FORMULARIO REACTIVO

    //crear campos de formulario areas para validar
    FormAreas = this.fb.group({
        nombre: ['', [Validators.required]],
        ubicacion: ['', [Validators.required]],
        imagen: ['', [Validators.required,]],

    });

    //metodo pasado a los campos para validar los campos
    checkField(field: string): boolean {
        return this.isValidField(field);
    }

    //metodo para validar campos
    isValidField(field: string): boolean {
        this.getErrorMessage(field);
        return (
            (this.FormAreas.get(field).touched || this.FormAreas.get(field).dirty) &&
            !this.FormAreas.get(field).valid
        );
    }

    //metodo para obtener mensaje de error
    private getErrorMessage(field: string): void {
        const { errors } = this.FormAreas.get(field);
        if (errors) {
            const minlenght = errors?.minlength?.requiredLength;
            const messages = {
                required: 'Debes ingresar un valor.',
            };

            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }

    }
    //metodo para setear los campos en el formulario al editar
    pathFormData(): void {
        this.FormAreas.get("nombre").setValue(this.data.area.nombre);
        this.FormAreas.get("ubicacion").setValue(this.data.area.ubicacion);
        this.FormAreas.get("imagen").setValue(this.data.area.imagen);
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
            this.cargarDocSvc.createDocumento(formularioDeDatos)
                .subscribe(res => {
                    if (res.status) {
                        this.toastr.showSuccess(res.msg);
                        this.loading = false;
                        this.FormAreas.get("imagen").setValue(res.response.url);
                        this.visualizarImagenArea = res.response.url;
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
        const formValue = this.FormAreas.value;
        if (this.actionTODO === Action.NEW) {
            this.areasSvc.new(formValue).subscribe((res) => {
                if (res.status) {
                    this.toastr.showSuccess(res.msg);
                    this.MatDialog.closeAll();
                } else {
                    this.toastr.showError(res.msg);
                }
            });
        } else {
            const areaId = this.data?.area?.id;
            this.areasSvc.update(areaId, formValue).subscribe((res) => {
                if (res.status) {
                    this.toastr.showSuccess(res.msg);
                    this.MatDialog.closeAll();
                } else {
                    this.toastr.showError(res.msg);
                }
            });
        }
    }

}
