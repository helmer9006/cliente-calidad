import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { ToastrCustomService } from '../../shared/services/toastr.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
    cumpleList = [];
    constructor(private userSvc: UsersService, private toastr: ToastrCustomService) { }

    async ngOnInit() {
        this.userSvc.getBirthday().subscribe(res => {
            if (res.status) {
                this.cumpleList = res.response;
            } else {
                this.toastr.showError(res.msg);
            }

        });

    }


}
