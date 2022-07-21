import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import { RutasGuard } from './shared/guards/rutas.guard';
const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomeModule),
        // canActivate: [AuthGuard], canLoad: [AuthGuard],
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
    { path: '**', redirectTo: '' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
