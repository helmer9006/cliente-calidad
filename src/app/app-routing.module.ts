import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import { RutasGuard } from './shared/guards/rutas.guard';
const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
        import('./pages/auth/login/login.module').then((m) => m.LoginModule),
            // canActivate: [RutasGuard],
    },
    {
        path: 'notFound',
        loadChildren: () =>
            import('./pages/not-found/not-found.module').then(
                (m) => m.NotFoundModule),
        canActivate: [RutasGuard],
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./pages/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [RutasGuard],
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./pages/auth/login/login.module').then((m) => m.LoginModule),
        canActivate: [CheckLoginGuard],
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./pages/admin/users/users.module').then((m) => m.UsersModule),
        canActivate: [RutasGuard],
    },
    {
        path: 'protocolos',
        loadChildren: () =>
            import('./pages/protocolos/protocolos.module').then((m) => m.ProtocolosModule),
        canActivate: [RutasGuard],

    },
    {
        path: 'configuracion',
        loadChildren: () =>
            import('./pages/configuracion/configuracion.module').then((m) => m.ConfiguracionModule),
        canActivate: [RutasGuard],
    },
    {
        path: 'infografia',
        loadChildren: () =>
            import('./pages/infografia/infografia.module').then((m) => m.InfografiaModule),
        canActivate: [RutasGuard],
    },
    { path: '**', redirectTo: '/dashboard' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
