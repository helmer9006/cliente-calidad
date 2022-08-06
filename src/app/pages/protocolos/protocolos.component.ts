import { OnInit, Component, } from '@angular/core';
import { AreasService } from '../admin/services/areas.service';
import { ToastrCustomService } from '../../shared/services/toastr.service';


@Component({
    selector: 'app-protocolos',
    templateUrl: './protocolos.component.html',
    styleUrls: ['./protocolos.component.scss'],
})


export class ProtocolosComponent implements OnInit {

    constructor(private AreasSrv: AreasService, private toastr: ToastrCustomService) { }

    AreasList: any[] = [];
    
    ngOnInit(): void {
        this.AreasSrv.getAllForUser().subscribe(res => {
            if (!res.status) {
                this.toastr.showError(res.msg);
            }
            this.AreasList = res.response;
        })

    }
}