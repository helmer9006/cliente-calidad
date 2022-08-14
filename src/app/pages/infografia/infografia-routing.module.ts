import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfografiaComponent } from './infografia.component';

const routes: Routes = [{
    path: "", component: InfografiaComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfografiaRoutingModule { }
