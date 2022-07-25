import { NgModule } from '@angular/core';
import { ProtocolosComponent } from './protocolos.component';
import { MaterialModule } from '../../material.module';
import { ProtocolosRoutingModule } from './protocolos-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AreaTarjetaComponent } from './components/area-tarjeta/area-tarjeta.component';
import { ListaComponent } from './components/lista/lista.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { BaseComponent } from './components/base/base.component';
import { VisorComponent } from './components/visor-pdf/visor.component';
import { DisableRightClickDirective } from './highlight.directive';
import { HeaderPdfComponent } from './components/header/headerPdf.component';
import { ModalProtocoloComponent } from './components/modal-protocolo/modal-protocolo.component';

@NgModule({
    declarations: [ProtocolosComponent, AreaTarjetaComponent, ListaComponent, ImagenPipe, BaseComponent, VisorComponent, DisableRightClickDirective, HeaderPdfComponent, ModalProtocoloComponent],
    imports: [CommonModule, ProtocolosRoutingModule, MaterialModule, FormsModule,
        ReactiveFormsModule, ProtocolosRoutingModule,PdfViewerModule, FlexLayoutModule, 
    ],
})
export class ProtocolosModule { }