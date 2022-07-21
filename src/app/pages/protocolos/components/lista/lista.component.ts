import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProtocolosService } from '../../../admin/services/protocolos.service';
import { environment } from '@env/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SpinnerService } from '../../../../shared/services/spinner.service';
@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements AfterViewInit, OnInit, OnDestroy {
    idArea: number;
    displayedColumns: string[] = ['id', 'nombre', 'especialidad', 'creado', 'createdAt', 'actions'];
    dataSource = new MatTableDataSource();

    private destroy$ = new Subject<any>();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private activateRouter: ActivatedRoute,
        private protocolosSrv: ProtocolosService,
        private spinnerSrv: SpinnerService,
    ) { }

    ngOnInit(): void {
        const user = JSON.parse(localStorage.getItem('user'));
        //capturo el id del area como param y hago la petición al api
        this.activateRouter.params
            .pipe(switchMap(({ idArea }) => this.protocolosSrv.getProtocolos(idArea, user.idEspecialidad, environment.EMPTY))).subscribe
            (protocolos => {
                if (!protocolos.status) {
                    window.alert("Error al cargar los protocolos");
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

}
