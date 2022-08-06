import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-clima',
    templateUrl: './clima.component.html',
    styleUrls: ['./clima.component.scss']
})
export class ClimaComponent implements OnInit {
    @Input() detalles: any

    constructor() { }

    ngOnInit(): void {
    }

    resolverImagen() {
        return `./assets/images/clima/${this.detalles?.weather}.png`;
    }

}
