import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
    cumpleList = [];
    constructor(private userSvc: UsersService) { }

    async ngOnInit() {
        this.userSvc.getBirthday().subscribe(res => {
            if (res.status) {
                this.cumpleList = res.response;
            } else {
                window.alert(res.msg);
            }

        });

    }


}
