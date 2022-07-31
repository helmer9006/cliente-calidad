import { RespuestaLogin, Usuario } from '../../models/usuarios.interface';
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../services/utils.service';
import { Pipe } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAdmin = null;
    isLogged = false;
    usuarioLogueado: any;
    private destroy$ = new Subject<any>();

    @Output() toggleSidenav = new EventEmitter<void>();

    constructor(private authSvc: AuthService,
        private utilsSvc: UtilsService) { }

    ngOnInit(): void {
        this.authSvc.user$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user: RespuestaLogin) => {
                this.isLogged = user ? true : false;
                this.isAdmin = user?.response.perfil;
                this.usuarioLogueado = user;
            });

        this.utilsSvc.getpantalla()
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                console.log(res);
            });

        console.log(this.utilsSvc.sizeDisplay);
    }

    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();
    }

    onToggleSidenav(): void {
        this.toggleSidenav.emit();
    }

    onLogout(): void {
        this.authSvc.logout();
    }
}
