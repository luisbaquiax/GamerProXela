import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BodegaProducto } from '../objetos/interfaces/BodegaProducto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  url = "http://localhost:3001/api/inventario";

  constructor(private http: HttpClient) { }

  public getProductosInventario(codigBodega: number): Observable<BodegaProducto[]>{
    return this.http.get<BodegaProducto[]>(this.url+`/${codigBodega}`)
  }

}
