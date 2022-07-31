import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AreasService } from '../admin/services/areas.service';
import { EspecialidadesService } from '../admin/services/especialidades.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


import { AuthService } from '../auth/auth.service';
import { map, takeUntil } from 'rxjs/operators';
import { ModalEspecialidadComponent } from './components/modal-especialidad/modal-especialidad.component';
import { ModalAreaComponent } from './components/modal-area/modal-area.component';

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html',
    styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit, OnDestroy {
    constructor(
        private areasSvc: AreasService,
        private especialidadesSvc: EspecialidadesService,
        private dialog: MatDialog,
        private breakObsrv: BreakpointObserver
    ) { this.mediaQuery(); }

    displayedColumnsAreas: string[] = ['id', 'nombre', 'ubicacion', 'creado', 'actualizado', 'acciones'];
    dataSourceAreas = new MatTableDataSource();
    displayedColumnsEspecialidades: string[] = ['id', 'nombre', 'creado', 'actualizado', 'acciones'];
    dataSourceEspecialidades = new MatTableDataSource();
    user: any;
    private destroy$ = new Subject<any>();
    errorMessage = null;
    areasList = [];
    especialidadesList = [];
    Landscape;
    esPantallagrande$: Observable<boolean>;
    public sizeDisplay: string = 'phone' || 'web';

    @ViewChild('MatSortAreas') MatSortAreas = new MatSort();
    @ViewChild('MatPaginatorAreas', { read: MatPaginator }) MatPaginatorAreas: MatPaginator;

    @ViewChild('MatSortEspecialidades') MatSortEspecialidades = new MatSort();
    @ViewChild('MatPaginatorEspecialidades', { read: MatPaginator }) MatPaginatorEspecialidades: MatPaginator;


    ngOnInit(): void {
        const { response } = JSON.parse(localStorage.getItem('user'));
        this.user = response;
        this.areasSvc.getAll().subscribe(res => {
            console.log(res);
            if (res.status) {
                this.areasList = res.response;
                this.dataSourceAreas.data = this.areasList;
            } else {
                window.alert("Error al cargar las áreas");
            }
            //validar si la pantalla es mobile
            this.esPantallagrande$ = this.breakObsrv.observe([Breakpoints.Small])
                .pipe(map(result => result.matches));


        });

        this.especialidadesSvc.getAll().subscribe(res => {
            console.log(res);
            if (res.status) {
                this.especialidadesList = res.response;
                this.dataSourceEspecialidades.data = this.especialidadesList;
            } else {
                window.alert("Error al cargar las especialidades");
            }
        });
    }



    ngAfterViewInit(): void {
        this.dataSourceAreas.sort = this.MatSortAreas;
        this.dataSourceAreas.paginator = this.MatPaginatorAreas;

        this.dataSourceEspecialidades.sort = this.MatSortEspecialidades;
        this.dataSourceEspecialidades.paginator = this.MatPaginatorEspecialidades;

    }

    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();
    }

    buscarAreas(filterValue: string): void {
        this.dataSourceAreas.filter = filterValue.trim().toLowerCase();
    }

    buscarEspecialidades(filterValue: string): void {
        this.dataSourceEspecialidades.filter = filterValue.trim().toLowerCase();
    }

    onDeleteAreas(id: number): void {
        if (window.confirm('¿De verdad quieres eliminar esta área?')) {
            this.areasSvc
                .delete(id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    window.alert(res.msg);
                    // actualizar resultado despues de eliminar área
                    this.areasSvc.getAll().subscribe((areas) => {
                        this.dataSourceAreas.data = areas.response;
                    });
                });
        }
    }
    onDeleteEspecialidad(id: number): void {
        if (window.confirm('¿De verdad quieres eliminar esta especialidad?')) {
            this.especialidadesSvc
                .delete(id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    window.alert(res.msg);
                    // actualizar resultado despues de eliminar especialidad
                    this.areasSvc.getAll().subscribe((esp) => {
                        this.dataSourceEspecialidades.data = esp.response;
                    });
                });
        }
    }

    onOpenModalArea(area = {}): void {

        let dialogRef = this.dialog.open(ModalAreaComponent, {
            height: this.sizeDisplay === 'phone' ? '80%' : '60%',
            width:  this.sizeDisplay === 'phone' ? '80%' : '30%',
            hasBackdrop: false,
            data: { title: 'Nueva área', area },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`, typeof result);
            //despues de cerrar el modal de agregar o editar actualiza las áreas
            this.areasSvc.getAll().subscribe((areas) => {
                this.dataSourceAreas.data = areas.response;
            });
        });
    }

    onOpenModalEspecialidad(especialidad = {}): void {

        let dialogRef = this.dialog.open(ModalEspecialidadComponent, {
            height: this.sizeDisplay === 'phone' ? '80%' : '40%',
            width:  this.sizeDisplay === 'phone' ? '80%' : '25%',
            hasBackdrop: false,
            data: { title: 'Nueva especialidad', especialidad },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`, typeof result);
            //despues de cerrar el modal de agregar o editar actualiza las especialidades
            this.especialidadesSvc.getAll().subscribe((especialidades) => {
                this.dataSourceEspecialidades.data = especialidades.response;
            });
        });
    }

    public mediaQuery() {

        this.breakObsrv
            .observe(Breakpoints.Small)
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    //AQUI SERA TRUE SOLO SI ESTA EN RESOLUCION DE CELULAR
                    this.sizeDisplay = 'phone';
                }
            });

        this.breakObsrv
            .observe(Breakpoints.Web)
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    //AQUI SERA TRUE SOLO SI ES RESOLUCION PARA WEB
                    this.sizeDisplay = 'web';
                }
            });
    }





}
