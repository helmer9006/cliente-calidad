import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ReqResResponseAreas } from '@app/shared/models/';
import { map } from 'rxjs/operators';
import { Area } from '../../../shared/models/areas.interface';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  urlPrevias: string[] = [];
  constructor(private http: HttpClient) {}
  private areasListPrivate: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private urlListPrevia: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  getAll(): Observable<ReqResResponseAreas> {
    return this.http.get<ReqResResponseAreas>(
      `${environment.API_URL}/api/areas/traertodas`
    );
  }

  async getAllAsync() {
    const response: any = await this.http
      .get<ReqResResponseAreas>(`${environment.API_URL}/api/areas/traertodas`)
      .toPromise();
    return response.response;
  }

  getAllSubAreas(padreId: number): Observable<ReqResResponseAreas> {
    return this.http.get<ReqResResponseAreas>(
      `${environment.API_URL}/api/areas/traerSubAreas/${padreId}`
    );
  }
  getAllForUser(): Observable<ReqResResponseAreas> {
    return this.http.get<ReqResResponseAreas>(
      `${environment.API_URL}/api/areas/traerAreasPorUsuario`
    );
  }

  new(area: Area): Observable<ReqResResponseAreas> {
    return this.http.post<ReqResResponseAreas>(
      `${environment.API_URL}/api/areas/crear`,
      area
    );
  }

  update(idArea: number, area: Area): Observable<ReqResResponseAreas> {
    return this.http.put<ReqResResponseAreas>(
      `${environment.API_URL}/api/areas/actualizar/${idArea}`,
      area
    );
  }

  delete(idArea: number): Observable<ReqResResponseAreas> {
    return this.http.delete<ReqResResponseAreas>(
      `${environment.API_URL}/api/areas/eliminar/${idArea}`
    );
  }

  getAreasByName(text: string): Observable<ReqResResponseAreas> {
    return this.http.get<ReqResResponseAreas>(
      `${environment.API_URL}/api/areas/buscarAreasPorNombre/${text}`
    );
  }

  //metodo que captura error
  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    console.log('error', error);
    return throwError(errorMessage);
  }

  // método para ofrecer la data de áreas list
  get getAreasListObservable() {
    return this.areasListPrivate.asObservable();
  }

  // añadir item al list
  set setAreasListObservable(data: any) {
    this.areasListPrivate.next(data);
  }
  // método para ofrecer list url visitadas
  get getUrlListObservable() {
    return this.urlListPrevia.asObservable();
  }

  // añadir item url
  set setUrlListObservable(data: any) {
    debugger;
    if (this.urlPrevias.length > 0) {
      if (!this.urlPrevias.some((item) => item == data))
        this.urlPrevias.push(data);
    } else {
      this.urlPrevias.push(data);
    }
    this.urlListPrevia.next(this.urlPrevias);
  }
}
