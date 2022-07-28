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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = null;
  isLogged = false;
  usuarioLogueado: Usuario
  private destroy$ = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService) {
  }

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: RespuestaLogin) => {
        this.isLogged = user ? true : false;
        this.isAdmin = user?.response.perfil;
      });

      this.usuarioLogueado = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      console.log("usuarioLogueado")
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
