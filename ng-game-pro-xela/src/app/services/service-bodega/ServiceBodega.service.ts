import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodegaProductModel } from 'src/app/objetos/interfaces/BodegaProductModel';
import { BodegaProducto } from 'src/app/objetos/interfaces/BodegaProducto';
import { Mensaje } from 'src/app/objetos/interfaces/Mensaje';

@Injectable({
  providedIn: 'root',
})
export class ServiceBodegaService {
  urlApi: string = 'http://localhost:3001/api/bodega';

  constructor(private http: HttpClient) {}
  /**
   * @param username
   * @returns list of products by bodega
   */
  public getProducts(username: string): Observable<BodegaProducto[]> {
    return this.http.get<BodegaProducto[]>(this.urlApi + `/${username}`);
  }

  public insertProductBodega(product: BodegaProductModel): Observable<Mensaje>{
    return this.http.post<Mensaje>(this.urlApi+`/insertar`, product);
  }

  /**
   * 
   * @param codigoBodega 
   * @param codigoProducto 
   * @param producto 
   * @returns 
   */
  public updateProductoBodega(codigoBodega: number, codigoProducto: number, producto: BodegaProducto){
    return this.http.put(this.urlApi + `/${codigoBodega}/${codigoProducto}`, producto);
  }
}
