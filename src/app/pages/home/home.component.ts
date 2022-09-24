import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import {NavigationStart,Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public authSvc: AuthService, private router: Router) {
    router.events.subscribe(e => {
      // obtener la url navegada con la propiedad url del router

      // los eventos de navegación son varios así que se filtra solo uno
      if(e instanceof NavigationStart){
         console.log(this.router.url);
      }

    });
  }

  ngOnInit(): void {

  }
}
