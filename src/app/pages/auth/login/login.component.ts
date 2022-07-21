import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseFormUser } from '@shared/utils/base-form-user';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private isValidEmail = /\S+@\S+\.\S+/;
    errorMessage = null;
    hide = true;
    private subscription: Subscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private authSvc: AuthService,
        private router: Router,
        public loginForm: BaseFormUser
    ) { }



    ngOnInit(): void {
        this.FormLogin.get('perfil').setValidators(null);
        this.FormLogin.get('perfil').updateValueAndValidity();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onLogin(): void {
        if (this.FormLogin.invalid) {
            return;
        }

        const formValue = this.FormLogin.value;
        this.subscription.add(
            this.authSvc.login(formValue).subscribe((res) => {
                console.log("res", res)
                if (res) {
                    this.router.navigate(['/dashboard']);
                }
            })
        );
    }

    checkField(field: string): boolean {
        return this.loginForm.isValidField(field);
    }


    //validar formulario Login
    FormLogin = this.fb.group({
        correo: [
            '',
            [Validators.required, Validators.pattern(this.isValidEmail)],
        ],
        clave: ['', [Validators.required, Validators.minLength(6)]],
        perfil: ['', [Validators.required]],
    });

    isValidField(field: string): boolean {
        this.getErrorMessage(field);
        return (
            (this.FormLogin.get(field).touched || this.FormLogin.get(field).dirty) &&
            !this.FormLogin.get(field).valid
        );
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

}
