import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class UtilsService implements OnInit, OnDestroy {
    sizeDisplay: string = 'phone' || 'web';
    esPantallagrande$: Observable<boolean>;
    constructor(
        private breakObsrv: BreakpointObserver
    ) { this.mediaQuery() }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
    ngOnInit(): void {
        this.getpantalla();

    }
    private sidebarOpened = new BehaviorSubject<boolean>(false);
    sidebarOpened$ = this.sidebarOpened.asObservable();

    openSidebar(value: boolean): void {
        this.sidebarOpened.next(value);
    }

    getpantalla = () => {
        return this.breakObsrv.observe([Breakpoints.Small])
            .pipe(map(result => result.matches));
    }



    public mediaQuery() {

        this.breakObsrv
            .observe(Breakpoints.Small)
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    //AQUI SERA TRUE SOLO SI ESTA EN RESOLUCION DE CELULAR
                    this.sizeDisplay = 'phone';
                    return this.sizeDisplay;
                }
            });

        this.breakObsrv
            .observe(Breakpoints.Web)
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    //AQUI SERA TRUE SOLO SI ES RESOLUCION PARA WEB
                    this.sizeDisplay = 'web';
                    return this.sizeDisplay;
                }
            });
    }


}
