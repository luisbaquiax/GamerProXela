import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleVent } from 'src/app/objetos/interfaces/DetalleVent';
import { ReportTopVentas } from 'src/app/objetos/interfaces/ReportTopVentas';

@Injectable({
  providedIn: 'root',
})
export class ServiceVentaService {
  url: string = 'http://localhost:3001/api/ventas/detalleVenta';

  urlVentasClente: string = 'http://localhost:3001/api/ventas/ventasCliente/';

  urlVentasSucursal: string = 'http://localhost:3001/api/ventas/ventasSucursal/';

  constructor(private http: HttpClient) {}

  public getDetalleVenta(codigoVenta: number): Observable<DetalleVent[]> {
    return this.http.get<DetalleVent[]>(this.url+`/${codigoVenta}`);
  }

  public getVentasCliente(nitCliente: string): Observable<ReportTopVentas[]> {
    return this.http.get<ReportTopVentas[]>(this.urlVentasClente+`${nitCliente}`);
  }

  public getVentasSucursal(codigSucursal: number): Observable<ReportTopVentas[]> {
    return this.http.get<ReportTopVentas[]>(this.urlVentasSucursal+`${codigSucursal}`);
  }
}
