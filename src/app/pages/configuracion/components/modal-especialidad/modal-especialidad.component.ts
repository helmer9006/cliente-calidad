import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { EspecialidadesService } from '../../../admin/services/especialidades.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrCustomService } from '../../../../shared/services/toastr.service';

enum Action {
    EDIT = 'edit',
    NEW = 'new',
}

@Component({
    selector: 'app-modal-especialidad',
    templateUrl: './modal-especialidad.component.html',
    styleUrls: ['./modal-especialidad.component.scss']
})
export class ModalEspecialidadComponent implements OnInit, OnDestroy {

    errorMessage = "";
    private Subscription: Subscription = new Subscription();
    actionTODO = Action.NEW;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private especialidadesSrv: EspecialidadesService,
        private fb: FormBuilder,
        private MatDialog: MatDialog,
        private toastr: ToastrCustomService,

    ) { }

    ngOnInit(): void {
        //validar si es editar o guardar nueva especialidad
        if (this.data.especialidad.hasOwnProperty('id')) {
            this.actionTODO = Action.EDIT;
            this.data.title = 'Editar Especialidad';
            this.pathFormData();

        }
    }

    ngOnDestroy(): void {
        this.Subscription.unsubscribe();
    }

    //creamos  campos del form para validad
    FormEspecialidades = this.fb.group({
        nombre: ['', [Validators.required]],
    })

    //metodo para que se ejecuta en cada campo para validar si hay errores
    checkField(field: string): boolean {
        return this.isValidField(field);
    }

    //metodo pra validar campos del formulario
    isValidField(field: string): boolean {
        this.getErrorMessage(field);
        return (
            (this.FormEspecialidades.get(field).touched || this.FormEspecialidades.get(field).dirty) &&
            !this.FormEspecialidades.get(field).valid
        );
    }

    //metodo para obtener mensaje de error
    private getErrorMessage(field: string): void {
        const { errors } = this.FormEspecialidades.get(field);
        if (errors) {
            const minlenght = errors?.minlength?.requiredLength;
            const messages = {
                required: 'Debes ingresar un valor.',
            };

            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }

    }

    //metodo para setear la data en el formulario a editar
    pathFormData(): void {
        this.FormEspecialidades.get("nombre").setValue(this.data.especialidad.nombre);
    }

    //Metodo para guardar o editar área
    onSave(): void {
        const formValue = this.FormEspecialidades.value;
        if (this.actionTODO === Action.NEW) {
            this.especialidadesSrv.new(formValue).subscribe((res) => {
                if (res.status) {
                    this.toastr.showSuccess(res.msg);
                    this.MatDialog.closeAll();
                } else {
                    this.toastr.showError(res.msg);
                }
            });
        } else {
            const especialidadId = this.data?.especialidad?.id;
            this.especialidadesSrv.update(especialidadId, formValue).subscribe((res) => {
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
