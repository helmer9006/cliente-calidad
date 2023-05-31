import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtocolosComponent } from './protocolos.component';
import { ListaComponent } from './components/lista/lista.component';
import { BaseComponent } from './components/base/base.component';
import { VisorComponent } from './components/visor-pdf/visor.component';
import { ListaSubareasComponent } from './components/lista-subareas/lista-subareas.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    // canActivate: [!CheckLoginGuard], canLoad: [!CheckLoginGuard],
    children: [
      {
        path: 'areas',
        component: ProtocolosComponent,
        // canActivate: [!CheckLoginGuard], canLoad: [!CheckLoginGuard],
      },
      {
        path: 'areas/:type?',
        component: ProtocolosComponent,
        // canActivate: [!CheckLoginGuard], canLoad: [!CheckLoginGuard],
      },
      {
        path: 'listado/:idArea',
        component: ListaComponent,
        // canActivate: [CheckLoginGuard!], canLoad: [!CheckLoginGuard!],
      },
      {
        path: 'listado/subareas/:idArea',
        component: ListaSubareasComponent,
        // canActivate: [CheckLoginGuard!], canLoad: [!CheckLoginGuard!],
      },
      {
        path: 'visor/:url',
        component: VisorComponent,
        // canActivate: [CheckLoginGuard!], canLoad: [!CheckLoginGuard!],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtocolosRoutingModule {}
