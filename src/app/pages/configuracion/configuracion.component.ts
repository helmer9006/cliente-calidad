import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AreasService } from '../admin/services/areas.service';
import { EspecialidadesService } from '../admin/services/especialidades.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs/operators';

import { takeUntil } from 'rxjs/operators';
import { ModalEspecialidadComponent } from './components/modal-especialidad/modal-especialidad.component';
import { ModalAreaComponent } from './components/modal-area/modal-area.component';
import { UtilsService } from '@app/shared/services/utils.service';
import { AuthService } from '../auth/auth.service';
import { DocumentosService } from '../admin/services/documentos.service';
import { UsersService } from '../admin/services/users.service';
import { RespuestaLogin } from '../../shared/models/usuarios.interface';
import { LogsService } from '../admin/services/logs.service';

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
        private utilsSvc: UtilsService,
        public authSvc: AuthService,
        private cargarDocSvc: DocumentosService,
        private usersSvc: UsersService,
        private logsSrv: LogsService,
    ) { }

    displayedColumnsAreas: string[] = ['id', 'nombre', 'ubicacion', 'creado', 'actualizado', 'acciones'];
    dataSourceAreas = new MatTableDataSource();
    displayedColumnsEspecialidades: string[] = ['id', 'nombre', 'creado', 'actualizado', 'acciones'];
    dataSourceEspecialidades = new MatTableDataSource();
    user: any;
    private destroy$ = new Subject<any>();
    errorMessage = null;
    areasList = [];
    especialidadesList = [];
    fileName = "";
    archivos: File[] = [];
    visualizarImagenArea = "";
    usuarioLogin: any;
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;
    usuariosList = [];
    logs = [];
    dataSourceLogs = new MatTableDataSource();
    displayedColumnsLogs = ['id', 'descripcion', 'creado'];
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


        this.getUserLogin();

        this.filteredOptions = this.FormLogs.get('usuarioId').valueChanges.pipe(
            // debounceTime(200),
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }


    FormLogs = new FormGroup({
        fechaInicial: new FormControl(''),
        fechaFinal: new FormControl(''),
        usuarioId: new FormControl(''),
    });




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
            height: this.utilsSvc.sizeDisplay === 'phone' ? '80%' : '60%',
            width: this.utilsSvc.sizeDisplay === 'phone' ? '80%' : '30%',
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
            height: this.utilsSvc.sizeDisplay === 'phone' ? '80%' : '40%',
            width: this.utilsSvc.sizeDisplay === 'phone' ? '80%' : '25%',
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

    //Metodo que captura el archivo imagen cambio de imagen
    onFileSelectedImagenPerfil(event) {
        console.log(event);
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            this.archivos.push(file)
            this.ActualizarImagen();
        }
    }

    //Metodo que actualiza la imagen del perfil
    ActualizarImagen() {
        try {
            const formularioDeDatos = new FormData();
            this.archivos.forEach(archivo => {
                formularioDeDatos.append('file', archivo)
            })
            this.cargarDocSvc.createDocumento(formularioDeDatos)
                .subscribe(res => {
                    if (res.status) {
                        // window.alert(res.msg);
                        this.usersSvc.changeImage({ idUsuario: this.usuarioLogin.usuarioId, foto: res.response.url })
                            .subscribe(result => {
                                if (result.status) {
                                    debugger;
                                    let userStorage = JSON.parse(localStorage.getItem("user"));
                                    userStorage.response.foto = res.response.url;
                                    localStorage.setItem("user", JSON.stringify(userStorage));
                                    window.location.reload();
                                    window.alert(res.msg);
                                } else {
                                    window.alert(result.msg);
                                }
                            });
                        this.visualizarImagenArea = res.response.url;

                    } else {
                        window.alert(res.message);
                    }
                }, () => {
                    window.alert('Error');
                })
        } catch (e) {
            console.log('ERROR', e);
        }


    }

    getUserLogin() {
        this.authSvc.user$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user: RespuestaLogin) => {
                this.usuarioLogin = user.response;
            });
    }


    private _filter(value: string): string[] {
        const filterValue = typeof value == 'string' ? value.toLowerCase() : value;
        //consultar api para obtener los usuarios
        this.usersSvc.getUserByName(filterValue).subscribe(res => {
            console.log(res);
            if (res.status) {
                this.usuariosList = res.response;
            } else {
                window.alert("Error al cargar los usuarios");
            }
        });
        return this.usuariosList;
    }

    //captuar la data del formulario LOGS para consultar

    onSubmit() {
        //para acceder a, por ejemplo, un control especifico, podemos hacerlo con this.profileForm.controls['nombreControl']
        console.warn(this.FormLogs.value);
        this.logsSrv.getLogs(this.FormLogs.value).subscribe(res => {
            if (res.status) {
                this.logs = res.response;
                this.dataSourceLogs.data = this.logs;
            } else {
                window.alert(res.msg);
            }
        });


    }

    changeClient(e) {
        window.alert(e);
    }

    displayFn(value?: number) {
        console.log(value);
        const res = value ? this.usuariosList.find(user => user.id == value).nombres : undefined;
        return res
    }

}
