import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SucursalProducto } from 'src/app/objetos/interfaces/SucursalProducto';

@Injectable({
  providedIn: 'root'
})
export class ServiceSucursalService {

  urlApi: string = 'http://localhost:3001/api/sucursal';

  constructor(private http: HttpClient) { }

  /**
   * Selecciona los productos de una sucursal, por usuario logeado
   * @param username 
   * @returns 
   */
  public getProductosSucursal(username: string): Observable<SucursalProducto[]>{
    return this.http.get<SucursalProducto[]>(`${this.urlApi}/${username}`);
  }

}
