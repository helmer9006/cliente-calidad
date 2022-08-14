import { Component, OnInit } from '@angular/core';
import { InfografiasService } from '../admin/services/infografias.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfografiaComponent } from './modal-infografia/modal-infografia.component';
import { UtilsService } from '../../shared/services/utils.service';
import { AuthService } from '../auth/auth.service';
import { ToastrCustomService } from '../../shared/services/toastr.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-infografia',
    templateUrl: './infografia.component.html',
    styleUrls: ['./infografia.component.scss']
})
export class InfografiaComponent implements OnInit {

    constructor(private infografiaSvc: InfografiasService,
        private dialog: MatDialog,
        private utilsSvc: UtilsService,
        private authSvc: AuthService,
        private toastr: ToastrCustomService
    ) { }

    infografiasList: any[] = [];
    user: any;
    private destroy$ = new Subject<any>();

    ngOnInit(): void {
        this.infografiaSvc.getAll().subscribe(
            (res) => {
                this.infografiasList = res.response;
            });

        this.user = JSON.parse(localStorage.getItem('user'));
    };


    onOpenModalInfografia(infografia = {}): void {

        let dialogRef = this.dialog.open(ModalInfografiaComponent, {
            height: this.utilsSvc.sizeDisplay === 'phone' ? '80%' : '50%',
            width: this.utilsSvc.sizeDisplay === 'phone' ? '80%' : '30%',
            hasBackdrop: false,
            data: { title: 'Nueva infografía', infografia },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`, typeof result);
            //despues de cerrar el modal de agregar o editar actualiza las infografias
            this.infografiaSvc.getAll().subscribe((infografias) => {
                this.infografiasList = infografias.response;
            });
        });
    }

    onDelete(id: number): void {
        if (window.confirm('¿De verdad quieres eliminar esta infografía?')) {
            this.infografiaSvc
                .delete(id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    if (!res.status) {
                        this.toastr.showError(res.msg);
                    } else {
                        this.toastr.showSuccess(res.msg);
                    }
                    // actualizar resultado despues de eliminar infografía
                    this.infografiaSvc.getAll().subscribe((infografias) => {
                        this.infografiasList = infografias.response;
                    });
                });
        }
    }
}
