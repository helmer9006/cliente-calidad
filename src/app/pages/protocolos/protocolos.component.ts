import { OnInit, Component, } from '@angular/core';
import { AreasService } from '../admin/services/areas.service';


@Component({
    selector: 'app-protocolos',
    templateUrl: './protocolos.component.html',
    styleUrls: ['./protocolos.component.scss'],
})


export class ProtocolosComponent implements OnInit {

    constructor(private AreasSrv: AreasService) { }

    AreasList: any[] = [];


    ngOnInit(): void {
        this.AreasSrv.getAllForUser().subscribe(res => {
            this.AreasList = res.response;
            console.log(res);
        })

    }
}