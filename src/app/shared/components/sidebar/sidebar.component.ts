import { UtilsService } from './../../services/utils.service';
import { AuthService } from '@auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { RespuestaLogin } from '../../models/usuarios.interface';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    constructor(
        private authSvc: AuthService,
        private utilsSvc: UtilsService) { }

    private destroy$ = new Subject<any>();
    usuarioLogin: any;

    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.authSvc.user$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user: RespuestaLogin) => {
                this.usuarioLogin = user.response;
            });
    }


    onExit(): void {
        this.authSvc.logout();
        this.utilsSvc.openSidebar(false);
    }
}
