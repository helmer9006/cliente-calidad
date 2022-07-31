import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './configuracion.component';
import { MaterialModule } from '../../material.module';
import { ModalAreaComponent } from './components/modal-area/modal-area.component';
import { ModalEspecialidadComponent } from './components/modal-especialidad/modal-especialidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ConfiguracionComponent, ModalAreaComponent, ModalEspecialidadComponent],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ConfiguracionModule { }
