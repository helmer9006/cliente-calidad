import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
    private isValidEmail = /\S+@\S+\.\S+/;
    errorMessage = null;

    constructor(private fb: FormBuilder) { }

    baseForm = this.fb.group({
        correo: [
            '',
            [Validators.required, Validators.pattern(this.isValidEmail)],
        ],
        clave: ['', [Validators.required, Validators.minLength(6)]],
        perfil: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        tipoDoc: ['', [Validators.required]],
        documento: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        idArea: ['', [Validators.required]],
        idEspecialidad: ['', [Validators.required]],
        foto: ['', []],
    });

    isValidField(field: string): boolean {
        this.getErrorMessage(field);
        return (
            (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
            !this.baseForm.get(field).valid
        );
    }
    
    private getErrorMessage(field: string): void {
        const { errors } = this.baseForm.get(field);
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
