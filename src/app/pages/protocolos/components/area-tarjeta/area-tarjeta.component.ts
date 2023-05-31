import { Location } from '@angular/common';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AreasService } from '@app/pages/admin/services/areas.service';
import { ToastrCustomService } from '@app/shared/services/toastr.service';
import { Area } from '@shared/models/areas.interface';

@Component({
  selector: 'app-area-tarjeta',
  templateUrl: './area-tarjeta.component.html',
  styleUrls: ['./area-tarjeta.component.scss'],
})
export class AreaTarjetaComponent implements OnInit {
  constructor(
    private AreasSrv: AreasService,
    private toastr: ToastrCustomService,
    public readonly router: Router
  ) {}
  subAreasList: any[] = [];
  @Input() area!: Area;
  ngOnInit(): void {
    this.AreasSrv.setUrlListObservable = this.router.url;
  }
  async selectedArea(idArea) {
    await this.getSubareas(idArea);
  }
  getSubareas(idArea) {
    this.AreasSrv.getAllSubAreas(idArea).subscribe((res) => {
      if (!res.status) {
        this.toastr.showError(res.msg);
      }
      this.subAreasList = res.response;
      this.AreasSrv.setAreasListObservable = res.response;
      console.log(this.subAreasList)
      if (this.subAreasList.length > 0) {
        this.router.navigate(['/protocolos/listado/subareas', this.area.id]);
      } else {
        this.router.navigate(['/protocolos/listado', this.area.id]);
      }
    });
  }
}
