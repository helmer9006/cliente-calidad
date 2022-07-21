import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtocolosComponent } from './protocolos.component';
import { ListaComponent } from './components/lista/lista.component';
import { BaseComponent } from './components/base/base.component';


const routes: Routes =
    [
        {
            path: '', component: BaseComponent,
            // canActivate: [!CheckLoginGuard], canLoad: [!CheckLoginGuard],
            children: [
                {
                    path: 'areas', component: ProtocolosComponent,
                    // canActivate: [!CheckLoginGuard], canLoad: [!CheckLoginGuard],
                },

                {
                    path: 'listado/:idArea', component: ListaComponent,
                    // canActivate: [CheckLoginGuard!], canLoad: [!CheckLoginGuard!],
                },
                // {
                //     path: 'verpdf', component: OutputPdfComponent,
                //     // canActivate: [CheckLoginGuard!], canLoad: [!CheckLoginGuard!],
                // },

            ]
        }
    ]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProtocolosRoutingModule { }
