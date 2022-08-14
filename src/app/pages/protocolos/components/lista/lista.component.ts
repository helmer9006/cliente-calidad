import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProtocolosService } from '../../../admin/services/protocolos.service';
import { environment } from '@env/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ModalProtocoloComponent } from '../modal-protocolo/modal-protocolo.component';
import { UsersService } from '../../../admin/services/users.service';
import { ToastrCustomService } from '../../../../shared/services/toastr.service';
@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements AfterViewInit, OnInit, OnDestroy {
    idArea: string;
    displayedColumns: string[] = ['id', 'nombre', 'especialidad', 'creado', 'createdAt', 'acciones'];
    dataSource = new MatTableDataSource();
    user: any;
    private destroy$ = new Subject<any>();
    errorMessage = null;



    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private activateRouter: ActivatedRoute,
        private protocolosSvc: ProtocolosService,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private toastr: ToastrCustomService
    ) { }


    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
        //capturo el id del area como param y hago la petición al api
        this.activateRouter.params
            .pipe(switchMap(({ idArea }) => (
                this.idArea = idArea,
                this.protocolosSvc.getProtocolos(idArea, this.user.idEspecialidad, environment.EMPTY)))).subscribe
            (protocolos => {
                if (!protocolos.status) {
                    this.toastr.showError(protocolos.msg);
                    this.toastr.showError("Error al cargar los protocolos");
                }
                this.dataSource.data = protocolos.response
            }
            );
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();

    }

    buscarProtocolo(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onOpenModal(protocolo = {}): void {

        let dialogRef = this.dialog.open(ModalProtocoloComponent, {
            height: '60%',
            width: '30%',
            hasBackdrop: false,
            data: { title: 'Nuevo protocolo', protocolo },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`, typeof result);
            //despues de cerrar el modal de agregar o editar actualiza los usaurios
            this.protocolosSvc.getProtocolos(this.idArea, this.user.idEspecialidad, environment.EMPTY).subscribe((protocolos) => {
                this.dataSource.data = protocolos.response;
            });
        });
    }

    onDelete(id: number): void {
        if (window.confirm('¿De verdad quieres eliminar este protocolo?')) {
            this.protocolosSvc
                .eliminarProtocolo(id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    if (!res.status) {
                        this.toastr.showError(res.msg);
                    } else {
                        this.toastr.showSuccess(res.msg);
                    }
                    // actualizar resultado despues de eliminar protocolo
                    this.protocolosSvc.getProtocolos(this.idArea, this.user.idEspecialidad, environment.EMPTY).subscribe((protocolos) => {
                        this.dataSource.data = protocolos.response;
                    });
                });
        }
    }


}
