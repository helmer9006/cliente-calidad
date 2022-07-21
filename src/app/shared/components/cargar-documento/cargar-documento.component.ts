import { Component, OnInit, VERSION } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { environment } from '@env/environment';
import { DocumentosService } from '../../../pages/admin/services/documentos.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-cargar-documento',
    templateUrl: './cargar-documento.component.html',
    styleUrls: ['./cargar-documento.component.scss']
})
export class CargarDocumentoComponent {

    constructor(private sanitizer: DomSanitizer, private cargarDocSrv: DocumentosService) { }
    public archivos: any = [];
    public previsualizacion: any;
    public loading: boolean;;

    capturarFile(event): any {
        const archivoCapturado = event.target.files[0]
        this.extraerBase64(archivoCapturado).then((imagen: any) => {
            this.previsualizacion = imagen.base;
            console.log(imagen);

        })
        this.archivos.push(archivoCapturado)
        // 
        // console.log(event.target.files);

    }
    subirArchivo(): any {
        try {
          this.loading = true;
          const formularioDeDatos = new FormData();
          this.archivos.forEach(archivo => {
            formularioDeDatos.append('file', archivo)
          })
          // formularioDeDatos.append('_id', 'MY_ID_123')
          this.cargarDocSrv.post(`${environment.API_URL}/api/documentos/cargar/imagenes`, formularioDeDatos)
            .subscribe(res => {
              this.loading = false;
              console.log('Respuesta del servidor', res);
    
            }, () => {
              this.loading = false;
              alert('Error');
            })
        } catch (e) {
          this.loading = false;
          console.log('ERROR', e);
    
        }
      }

    extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
        try {
            const unsafeImg = window.URL.createObjectURL($event);
            const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
            const reader = new FileReader();
            reader.readAsDataURL($event);
            reader.onload = () => {
                resolve({
                    base: reader.result
                });
            };
            reader.onerror = error => {
                resolve({
                    base: null
                });
            };

        } catch (e) {
            return null;
        }
    })

}