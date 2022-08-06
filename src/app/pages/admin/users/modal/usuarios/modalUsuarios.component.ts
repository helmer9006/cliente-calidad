import { Component, VERSION, ElementRef, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { BaseFormUser } from '@shared/utils/base-form-user';
import { Subject, Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { AreasService } from '../../../services/areas.service';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { AuthService } from '../../../../auth/auth.service';
import { ToastrCustomService } from '../../../../../shared/services/toastr.service';


enum Action {
    EDIT = 'edit',
    NEW = 'new',
}

@Component({
    selector: 'app-modal',
    templateUrl: './modalUsuarios.component.html',
    styleUrls: ['./modalUsuarios.component.scss'],
})
export class ModalComponent implements OnInit {
    actionTODO = Action.NEW;
    showPasswordField = true;
    textButton = 'Guardar';
    hide = true;
    areasList = null;
    especialidadesList = null;
    name = 'Angular ' + VERSION.major;
    FotoSelected: string;
    previsualizacion: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public userForm: BaseFormUser,
        private userSvc: UsersService,
        private areasSvc: AreasService,
        private especialidadesSvc: EspecialidadesService,
        private MatDialog: MatDialog,
        private authSvc: AuthService,
        private toastr: ToastrCustomService
    ) { }



    ngOnInit(): void {
        this.areasSvc.getAll().subscribe((res) => {
            this.areasList = res.response;
        })

        this.especialidadesSvc.getAll().subscribe((res) => {
            this.especialidadesList = res.response;
        })

        if (this.data?.user.hasOwnProperty('id')) {
            console.log("data", this.data);
            this.actionTODO = Action.EDIT;
            this.showPasswordField = false;
            this.textButton = 'Actualizar';
            this.userForm.baseForm.get('clave').setValidators(null);
            this.userForm.baseForm.updateValueAndValidity();
            this.data.title = 'Editar usuario';
            this.pathFormData();
        }

    }



    checkField(field: string): boolean {
        return this.userForm.isValidField(field);
    }

    private pathFormData(): void {
        this.userForm.baseForm.patchValue({
            nombres: this.data?.user?.nombres,
            perfil: this.data?.user?.perfil,
            correo: this.data?.user?.correo,
            apellidos: this.data?.user?.apellidos,
            // clave: this.data?.user?.clave,
            // estado: this.data?.user?.estado, :TODO: crear funcionalidad de activar o inactivar
            tipoDoc: this.data?.user?.tipoDoc,
            documento: this.data?.user?.documento,
            fechaNacimiento: new Date(this.data?.user?.fechaNacimiento),
            celular: this.data?.user?.celular,
            idArea: this.data?.user?.idArea,
            idEspecialidad: this.data?.user?.idEspecialidad
        });
    }

    onSave(): void {
        const formValue = this.userForm.baseForm.value;
        if (this.actionTODO === Action.NEW) {
            this.userSvc.new(formValue).subscribe((res) => {
                if (res.status) {
                    this.toastr.showSuccess(res.msg);
                    this.MatDialog.closeAll();
                } else {
                    this.toastr.showError(res.msg);
                }
            });
        } else {
            const userId = this.data?.user?.id;
            delete formValue.clave;
            this.userSvc.update(userId, formValue).subscribe((res) => {
                if (res.status) {
                    this.toastr.showSuccess(res.msg);
                    this.MatDialog.closeAll();
                    this.authSvc.checkToken();
                } else {
                    this.toastr.showError(res.msg);
                }
            });
        }
    }

    @ViewChild('fileInput') fileInput: ElementRef;
    fileAttr = '';
    fileName = '';

    onFileSelected(event) {

        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            // HTML5 FileReader API
            let reader = new FileReader();

            reader.onload = (e: any) => {
                let image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    let imgBase64Path = e.target.result;
                    this.userForm.baseForm.get("foto").setValue(imgBase64Path);
                    this.previsualizacion = imgBase64Path;
                };
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    changeStatus(userId: number) {
        this.userSvc.changeStatus(userId).subscribe((res) => {
            if (res.status) {
                this.toastr.showSuccess(res.msg);
            } else {
                this.toastr.showError(res.msg);
            }
        }
        );
    }

}
