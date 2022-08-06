import { Component, Input, OnInit } from '@angular/core';
import { Area } from '@shared/models/areas.interface';

@Component({
    selector: 'app-area-tarjeta',
    templateUrl: './area-tarjeta.component.html',
    styleUrls: ['./area-tarjeta.component.scss'],
})
export class AreaTarjetaComponent {
    @Input() area!: Area;
}
