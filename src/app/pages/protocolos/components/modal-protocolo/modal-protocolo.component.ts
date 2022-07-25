import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProtocolosService } from '@app/pages/admin/services/protocolos.service';
import { Subject, Subscription } from 'rxjs';
import { AreasService } from '../../../admin/services/areas.service';
import { EspecialidadesService } from '../../../admin/services/especialidades.service';
import { DocumentosService } from '../../../admin/services/documentos.service';


enum Action {
    EDIT = 'edit',
    NEW = 'new',
}

@Component({
    selector: 'app-modal-protocolo',
    templateUrl: './modal-protocolo.component.html',
    styleUrls: ['./modal-protocolo.component.scss']
})
export class ModalProtocoloComponent implements OnInit, OnDestroy {
    errorMessage = "";
    private subscription: Subscription = new Subscription();
    areasList: any[] = [];
    especialidadesList: any[] = [];
    fileName = '';
    public archivos: any = [];
    public loading: boolean;
    color: string = "basic";
    actionTODO = Action.NEW;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private protocolosSrv: ProtocolosService,
        private areasSvc: AreasService,
        private especialidadesSvc: EspecialidadesService,
        private cargarDocSvc: DocumentosService,
        private MatDialog: MatDialog
    ) { }

    ngOnInit(): void {
        //traer areas
        this.subscription.add(this.areasSvc.getAll().subscribe(areas => {
            this.areasList = areas.response;
        }));
        //traer especialidades
        this.subscription.add(this.especialidadesSvc.getAll().subscribe(especialidades => {
            this.especialidadesList = especialidades.response;
        }));
        //validar si viene protocolo para editar o es nuevo
        if (this.data?.protocolo.hasOwnProperty('id')) {
            this.actionTODO = Action.EDIT;

            this.FormProtocolo.updateValueAndValidity();
            this.data.title = 'Editar protocolo';
            this.pathFormData();
        }
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    onProtocolo(): void {

    }


    //FORMULARIO REACTIVO
    //metodo pasado a los campos para validar los campos
    checkField(field: string): boolean {
        return this.isValidField(field);
    }

    //validar formulario protocolo
    FormProtocolo = this.fb.group({
        nombre: ['', [Validators.required]],
        idEspecialidad: ['', [Validators.required]],
        idArea: ['', [Validators.required]],
        url: ['', [Validators.required]],
    });

    isValidField(field: string): boolean {
        this.getErrorMessage(field);
        return (
            (this.FormProtocolo.get(field).touched || this.FormProtocolo.get(field).dirty) &&
            !this.FormProtocolo.get(field).valid
        );
    }

    private getErrorMessage(field: string): void {
        const { errors } = this.FormProtocolo.get(field);
        if (errors) {
            const minlenght = errors?.minlength?.requiredLength;
            const messages = {
                required: 'Debes ingresar un valor.'
            };

            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }

    }

    onSave(): void {
        const formValue = this.FormProtocolo.value;
        if (this.actionTODO === Action.NEW) {
            this.protocolosSrv.postCrearProtocolo(formValue).subscribe((res) => {
                window.alert(res.msg)
                if (res.status) {
                    this.MatDialog.closeAll();
                }
                console.log('New ', res);
            });
        } else {
            const protocoloId = this.data?.protocolo?.id;
            this.protocolosSrv.putActualizarProtocolo(protocoloId, formValue).subscribe((res) => {
                console.log('Update', res);
                window.alert(res.msg)
                if (res.status) {
                    this.MatDialog.closeAll();
                }
            });
        }
    }

    onFileSelected(event) {
        console.log(event);
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            this.archivos.push(file)

            this.subirArchivo();
        }
    }

    subirArchivo(): any {
        try {
            this.loading = true;
            const formularioDeDatos = new FormData();
            this.archivos.forEach(archivo => {
                formularioDeDatos.append('file', archivo)
            })
            // formularioDeDatos.append('_id', 'MY_ID_123')
            this.cargarDocSvc.createDocumento(formularioDeDatos)
                .subscribe(res => {
                    debugger;
                    if (res.status) {
                        window.alert(res.msg);
                        this.loading = false;
                        this.FormProtocolo.get("url").setValue(res.response.url);
                        this.color = "primary";
                    } else {
                        window.alert(res.message);
                    }
                }, () => {
                    this.loading = false;
                    alert('Error');
                })
        } catch (e) {
            this.loading = false;
            console.log('ERROR', e);

        }
    }

    pathFormData(): void{
        this.FormProtocolo.get("nombre").setValue(this.data.protocolo.nombre);
        this.FormProtocolo.get("idEspecialidad").setValue(this.data.protocolo.idEspecialidad);
        this.FormProtocolo.get("idArea").setValue(this.data.protocolo.idArea);
        this.FormProtocolo.get("url").setValue(this.data.protocolo.url);
    }
}
