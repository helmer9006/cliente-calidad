import { Component, Input, OnInit } from '@angular/core';
import { Area } from '@shared/models/areas.interface';

@Component({
    selector: 'app-area-tarjeta',
    templateUrl: './area-tarjeta.component.html',
    styleUrls: ['./area-tarjeta.component.scss'],
})
export class AreaTarjetaComponent {
    @Input() area!: Area;
    // pdfSrc = "http://localhost:4000/public/pdf/1657254593267.pdf"
    pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
}
