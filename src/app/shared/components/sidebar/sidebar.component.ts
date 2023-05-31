import { UtilsService } from './../../services/utils.service';
import { AuthService } from '@auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { RespuestaLogin } from '../../models/usuarios.interface';
import { Subject, Subscription } from 'rxjs';
import { AreasService } from '@app/pages/admin/services/areas.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(
    private areaSrv: AreasService,
    private authSvc: AuthService,
    private utilsSvc: UtilsService
  ) {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: RespuestaLogin) => {
        this.usuarioLogin = user?.response;
      });
  }

  private destroy$ = new Subject<any>();
  usuarioLogin: any;

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.areaSrv.setAreasListObservable = [];
  }

  onExit(): void {
    this.subscription.add(
      this.authSvc.logout().subscribe((res) => {
        console.log('res', res);
      })
    );
    this.utilsSvc.openSidebar(false);
  }
}
