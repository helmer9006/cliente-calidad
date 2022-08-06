import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalComponent } from './users/modal/usuarios/modalUsuarios.component';
import { MaterialModule } from '@app/material.module';
import { CargarDocumentoComponent } from '../../shared/components/cargar-documento/cargar-documento.component';
import { ClimaComponent } from './components/clima/clima.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [AdminComponent, ModalComponent, CargarDocumentoComponent, ClimaComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        ReactiveFormsModule, 
        FormsModule,
        FlexLayoutModule
    ],
})
export class AdminModule { }
