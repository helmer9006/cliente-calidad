import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from '@app/material.module';
import { ClaveComponent } from './modal/clave/clave.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [UsersComponent, ClaveComponent],
    imports: [CommonModule, UsersRoutingModule, MaterialModule, FormsModule,
        ReactiveFormsModule
    ],
})
export class UsersModule { }
