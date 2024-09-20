import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportTop10Clientes } from 'src/app/objetos/interfaces/ReportTop10Clientes';
import { ReportTopArticulos } from 'src/app/objetos/interfaces/ReportTopArticulos';
import { ReportTopSucursales } from 'src/app/objetos/interfaces/ReportTopSucursales';
import { ReportTopVentas } from 'src/app/objetos/interfaces/ReportTopVentas';

@Injectable({
  providedIn: 'root',
})
export class ServiceAdminService {
  urlApi: string = 'http://localhost:3001/api/reportsAdmin';

  constructor(private http: HttpClient) {}

  public getTopVentas(
    fecha1: string,
    fecha2: string
  ): Observable<ReportTopVentas[]> {
    return this.http.get<ReportTopVentas[]>(`${this.urlApi}/${fecha1}/${fecha2}`);
  }

  public getTopSucursales(): Observable<ReportTopSucursales[]> {
    return this.http.get<ReportTopSucursales[]>(`${this.urlApi}/topSucursales`);
  }

  public getTopProductos(): Observable<ReportTopArticulos[]> {
    return this.http.get<ReportTopArticulos[]>(`${this.urlApi}/topArticulos`);
  }

  public getTopClientes(): Observable<ReportTop10Clientes[]> {
    return this.http.get<ReportTop10Clientes[]>(`${this.urlApi}/topClientes`);
  }
}
