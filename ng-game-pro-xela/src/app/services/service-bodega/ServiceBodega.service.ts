import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodegaProducto } from 'src/app/objetos/interfaces/BodegaProducto';

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
}
