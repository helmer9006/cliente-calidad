import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfografiaRoutingModule } from './infografia-routing.module';
import { InfografiaComponent } from './infografia.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BackgroundUrlPipe } from './backgroundUrl.pipe';
import { MaterialModule } from '../../material.module';
import { ModalInfografiaComponent } from './modal-infografia/modal-infografia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [InfografiaComponent, BackgroundUrlPipe, ModalInfografiaComponent],
    imports: [
        CommonModule,
        InfografiaRoutingModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class InfografiaModule { }
