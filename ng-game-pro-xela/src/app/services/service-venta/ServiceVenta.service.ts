import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleVent } from 'src/app/objetos/interfaces/DetalleVent';
import { DetalleVentaModel } from 'src/app/objetos/interfaces/DetalleVentaModel';
import { ReportTopVentas } from 'src/app/objetos/interfaces/ReportTopVentas';
import { VentaModel } from 'src/app/objetos/interfaces/VentaModel';

@Injectable({
  providedIn: 'root',
})
export class ServiceVentaService {
  url: string = 'http://localhost:3001/api/ventas/detalleVenta';

  urlVentasClente: string = 'http://localhost:3001/api/ventas/ventasCliente/';

  urlVentasSucursal: string = 'http://localhost:3001/api/ventas/ventasSucursal/';
  urlApi: string = 'http://localhost:3001/api/ventas'

  urlAddDetalleVenta: string = 'http://localhost:3001/api/ventas/addDetalle';

  constructor(private http: HttpClient) {}

  public addProductoVenta(detalle: DetalleVentaModel): Observable<DetalleVentaModel> {
    return this.http.post<DetalleVentaModel>(this.urlAddDetalleVenta, detalle);
  }

  public getDetalleVenta(codigoVenta: number): Observable<DetalleVent[]> {
    return this.http.get<DetalleVent[]>(this.url+`/${codigoVenta}`);
  }

  public getVentasCliente(nitCliente: string): Observable<ReportTopVentas[]> {
    return this.http.get<ReportTopVentas[]>(this.urlVentasClente+`${nitCliente}`);
  }

  public getVentasSucursal(codigSucursal: number): Observable<ReportTopVentas[]> {
    return this.http.get<ReportTopVentas[]>(this.urlVentasSucursal+`${codigSucursal}`);
  }

  /**
   * @url http://localhost:3001/api/ventas
   * @returns 
   */
  public getAllVentas(): Observable<VentaModel[]> {
    return this.http.get<VentaModel[]>(this.urlApi);
  }
  
  public createVenta(venta: VentaModel): Observable<VentaModel> {
    return this.http.post<VentaModel>(this.urlApi, venta);
  }
}
