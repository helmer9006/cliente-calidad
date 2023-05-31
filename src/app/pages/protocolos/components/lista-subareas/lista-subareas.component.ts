import { Component, OnInit } from '@angular/core';
import { AreasService } from '@app/pages/admin/services/areas.service';
import { ToastrCustomService } from '@app/shared/services/toastr.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Route,
  Router,
  RouterEvent,
  RoutesRecognized,
} from '@angular/router';

import { Location } from '@angular/common';
@Component({
  selector: 'app-lista-subareas',
  templateUrl: './lista-subareas.component.html',
  styleUrls: ['./lista-subareas.component.scss'],
})
export class ListaSubareasComponent implements OnInit {
  subAreasList: any[] = [];
  idArea;
  urlPrevia: string;
  UrlActual: string;
  UrlList: string[] = [];
  constructor(
    private AreasSrv: AreasService,
    private toastr: ToastrCustomService,
    private activateRouter: ActivatedRoute,
    private _location: Location,
    private router: Router
  ) {
    this.AreasSrv.getAreasListObservable.pipe().subscribe((listAreas: any) => {
      this.subAreasList = listAreas;
    });
    this.AreasSrv.getUrlListObservable.pipe().subscribe((list: any) => {
      this.UrlList = list;
    });
    this.UrlActual = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.urlPrevia = this.UrlActual;
        this.UrlActual = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({ idArea }) => {
      this.idArea = idArea;
    });
    this.getSubareas(this.idArea);
  }
  getSubareas(idArea) {
    this.AreasSrv.getAllSubAreas(idArea).subscribe((res) => {
      if (!res.status) {
        this.toastr.showError(res.msg);
      }
      this.subAreasList = res.response;
    });
  }
  back() {
    console.log(this.UrlList)
    this.redirectTo(this.UrlList[this.UrlList.length - 2]);
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
}
