import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersModule } from './users/users.module';
import { CargarArchivoComponent } from '../../shared/components/cargar-archivo/cargar-archivo.component';

const routes: Routes = [
    { path: '', component: AdminComponent },
    //TODO: tener en cuenta lo comentado para componentes con detalles que serian los hijos
    {
        path: 'upload', component: CargarArchivoComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
