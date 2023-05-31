import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProtocolosService } from '@app/pages/admin/services/protocolos.service';
import { Observable, Subscription } from 'rxjs';
import { AreasService } from '../../../admin/services/areas.service';
import { EspecialidadesService } from '../../../admin/services/especialidades.service';
import { DocumentosService } from '../../../admin/services/documentos.service';
import { ToastrCustomService } from '@shared/services/toastr.service';
import { debounceTime, startWith, map } from 'rxjs/operators';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal-protocolo',
  templateUrl: './modal-protocolo.component.html',
  styleUrls: ['./modal-protocolo.component.scss'],
})
export class ModalProtocoloComponent implements OnInit, OnDestroy {
  errorMessage = '';
  private subscription: Subscription = new Subscription();
  areasList: any[] = [];
  especialidadesList: any[] = [];
  fileName = '';
  public archivos: any = [];
  public loading: boolean;
  color: string = 'basic';
  actionTODO = Action.NEW;
  filteredOptions: Observable<string[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private protocolosSrv: ProtocolosService,
    private areasSvc: AreasService,
    private especialidadesSvc: EspecialidadesService,
    private cargarDocSvc: DocumentosService,
    private MatDialog: MatDialog,
    private toastr: ToastrCustomService
  ) {}

  async ngOnInit() {
    //traer areas
    // this.subscription.add(
    //   this.areasSvc.getAll().subscribe((areas) => {
    //     console.log(areas.response);
    //     this.areasList = areas.response;
    //   })
    // );
    this.areasList = await this.areasSvc.getAllAsync();

    //traer especialidades
    this.subscription.add(
      this.especialidadesSvc.getAll().subscribe((especialidades) => {
        this.especialidadesList = especialidades.response;
      })
    );
    //validar si viene protocolo para editar o es nuevo
    if (this.data?.protocolo.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;

      this.FormProtocolo.updateValueAndValidity();
      this.data.title = 'Editar protocolo';
      this.pathFormData();
    }

    this.filteredOptions = this.FormProtocolo.get('idArea').valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map((value) => this.buscarAreasPorNombre(value || ''))
    );
  }

  async traerAreas() {
    this.areasList = await this.areasSvc.getAllAsync();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onProtocolo(): void {}

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
      (this.FormProtocolo.get(field).touched ||
        this.FormProtocolo.get(field).dirty) &&
      !this.FormProtocolo.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.FormProtocolo.get(field);
    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'Debes ingresar un valor.',
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }

  onSave(): void {
    const formValue = this.FormProtocolo.value;
    if (this.actionTODO === Action.NEW) {
      this.protocolosSrv.postCrearProtocolo(formValue).subscribe((res) => {
        if (res.status) {
          this.toastr.showSuccess(res.msg);
          this.MatDialog.closeAll();
        } else {
          this.toastr.showError(res.msg);
        }
      });
    } else {
      const protocoloId = this.data?.protocolo?.id;
      this.protocolosSrv
        .putActualizarProtocolo(protocoloId, formValue)
        .subscribe((res) => {
          if (res.status) {
            this.toastr.showSuccess(res.msg);
            this.MatDialog.closeAll();
          } else {
            this.toastr.showError(res.msg);
          }
        });
    }
  }

  onFileSelected(event) {
    debugger;
    console.log(event);
    if (event.target.files[0].size > 6291456) {
      this.toastr.showWarning('El archivo no puede ser mayor a 6MB');
      return;
    }
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.archivos.push(file);

      this.subirArchivo();
    }
  }

  subirArchivo(): any {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo) => {
        formularioDeDatos.append('file', archivo);
      });
      // formularioDeDatos.append('_id', 'MY_ID_123')
      this.cargarDocSvc.createDocumento(formularioDeDatos).subscribe(
        (res) => {
          if (res.status) {
            this.toastr.showSuccess(res.msg);
            this.loading = false;
            this.FormProtocolo.get('url').setValue(res.response.url);
            this.color = 'primary';
          } else {
            this.toastr.showError(res.msg);
          }
        },
        () => {
          this.loading = false;
          this.toastr.showError('Error al subir el archivo');
        }
      );
    } catch (e) {
      this.loading = false;
      this.toastr.showError('Error!');
      console.log('ERROR', e);
    }
  }

  pathFormData(): void {
    this.FormProtocolo.get('nombre').setValue(this.data.protocolo.nombre);
    this.FormProtocolo.get('idEspecialidad').setValue(
      this.data.protocolo.idEspecialidad
    );
    this.FormProtocolo.get('idArea').setValue(this.data.protocolo.idArea);
    this.FormProtocolo.get('url').setValue(this.data.protocolo.url);
  }

  //metodo para poder pasar el value id al autocomplete y mostrar nombre
  displayFn(value?: number) {
    debugger;
    console.log(this.areasList);
    const res =
      value && this.areasList.length > 0
        ? this.areasList.find((area) => area.id == value).nombre
        : undefined;
    return res;
  }

  private buscarAreasPorNombre(value: string): string[] {
    debugger;
    if (value == '') return;
    const filterValue =
      typeof value == 'string' ? value.toLowerCase().trim() : value;
    //consultar api para obtener las áreas
    this.areasSvc.getAreasByName(filterValue).subscribe((res) => {
      if (res.status) {
        this.areasList = res.response;
      } else {
        this.toastr.showError(res.msg);
      }
    });
    return this.areasList;
  }
}
