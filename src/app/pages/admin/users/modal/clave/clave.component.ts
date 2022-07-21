import { UsersService } from '../../../services/users.service';
import { AreasService } from '../../../services/areas.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { BaseFormUser } from '@shared/utils/base-form-user';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-clave',
    templateUrl: './clave.component.html',
    styleUrls: ['./clave.component.scss'],
})
export class ClaveComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    errorMessage = null;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, //para pasar data al formulario por el campo data
        private fb: FormBuilder,
        private router: Router,
        private userSvc: UsersService,
        private MatDiaglog: MatDialog,
    ) { }

    ngOnInit(): void {
        // this.FormLogin.get('perfil').setValidators(null);
        // this.FormLogin.get('perfil').updateValueAndValidity();
        if (this.data?.user.hasOwnProperty('id')) {
            // this.FormLogin.updateValueAndValidity();
            this.pathFormData();
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSave(): void {
        debugger;
        if (this.FormLogin.invalid) {
            return;
        }

        const formValue = this.FormLogin.value;
        this.subscription.add(
            this.userSvc.changePass(formValue).subscribe((res) => {
                window.alert(res.msg)
                if (!res.status) {
                    return
                }
                this.MatDiaglog.closeAll();
            })
        );
    }

    //validar formulario Login
    FormLogin = this.fb.group({
        clave: ['', [Validators.required, Validators.minLength(6)],],
        nuevaClave: ['', [Validators.required, Validators.minLength(6)]],
        idUsuario: ['', [Validators.required]],
    });

    isValidField(field: string): boolean {
        this.getErrorMessage(field);
        return (
            (this.FormLogin.get(field).touched || this.FormLogin.get(field).dirty) &&
            !this.FormLogin.get(field).valid
        );
    }

    checkField(field: string): boolean {
        return this.isValidField(field);
    }

    private getErrorMessage(field: string): void {
        const { errors } = this.FormLogin.get(field);
        if (errors) {
            const minlenght = errors?.minlength?.requiredLength;
            const messages = {
                required: 'Debes ingresar un valor.',
                pattern: 'No es un correo electrónico válido.',
                minlength: `Este campo debe tener más de ${minlenght} caracteres`,
            };

            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }
    }

    private pathFormData(): void {
        this.FormLogin.patchValue({
            idUsuario: this.data?.user?.id
        });
    }

}
