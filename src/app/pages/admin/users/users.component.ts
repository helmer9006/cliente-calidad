import { takeUntil } from 'rxjs/operators';
import { UsersService } from './../services/users.service';
import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/usuarios/modalUsuarios.component';
import { ClaveComponent } from './modal/clave/clave.component';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { BaseFormUser } from '../../../shared/utils/base-form-user';
import { ToastrCustomService } from '../../../shared/services/toastr.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit, OnDestroy {

    displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'tipoDoc', 'documento', 'correo', 'fechaNacimiento', 'celular', 'perfil', 'estado', 'idArea', 'idEspecialidad', 'createdAt', 'actions'];
    dataSource = new MatTableDataSource();
    private destroy$ = new Subject<any>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private userSvc: UsersService, private dialog: MatDialog,
        public userForm: BaseFormUser,
        private toastr: ToastrCustomService) { }

    ngOnInit(): void {
        this.userSvc.getAll().subscribe((users) => {
            this.dataSource.data = users.response;
            console.log("this.dataSource.data", this.dataSource.data)
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    onDelete(userId: number): void {
        if (window.confirm('¿De verdad quieres eliminar a este usuario?')) {
            this.userSvc
                .delete(userId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    if (res.status) {
                        this.toastr.showSuccess(res.msg)
                    } else {
                        this.toastr.showError(res.msg)
                    }
                    // actualizar resultado despues de eliminar usuario
                    this.userSvc.getAll().subscribe((users) => {
                        this.dataSource.data = users.response;
                    });
                });
        }
    }

    onOpenModal(user = {}): void {
        this.userForm.baseForm.reset();
        console.log('User->', user);
        let dialogRef = this.dialog.open(ModalComponent, {
            height: '90%',
            width: '50%',
            hasBackdrop: false,
            data: { title: 'Nuevo usuario', user },
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`, typeof result);
            //despues de cerrar el modal de agregar o editar actualiza los usaurios
            this.userSvc.getAll().subscribe((users) => {
                this.dataSource.data = users.response;
            });
        });
    }

    onOpenModalCambioClave(user = {}): void {
        console.log('User->', user);
        let dialogRef = this.dialog.open(ClaveComponent, {
            height: '40%',
            width: '25%',
            hasBackdrop: false,
            position: { top: '10%' },
            data: { title: 'Cambiar Clave', user },
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();
    }

    buscarUsuario(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    cambiarEstado(event: any, id: number): void {
        this.userSvc.changeStatus(id).subscribe((res) => {
            if (res.status) {
                this.toastr.showSuccess(res.msg);
            } else {
                this.toastr.showError(res.msg);
            }
        }
        );
    }
}
