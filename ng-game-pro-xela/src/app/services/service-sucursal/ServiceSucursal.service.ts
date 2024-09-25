import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SucursalModel } from 'src/app/objetos/interfaces/SucursalModel';
import { SucursalProducto } from 'src/app/objetos/interfaces/SucursalProducto';
import { SucursalProductoModel } from 'src/app/objetos/interfaces/SucursalProductoModel';
import { SucursalUsuario } from 'src/app/objetos/interfaces/SucursalUsuario';

@Injectable({
  providedIn: 'root',
})
export class ServiceSucursalService {
  urlApi: string = 'http://localhost:3001/api/sucursal';
  urlApiSucuralProducto: string = 'http://localhost:3001/api/sucursal/sucursalProducto';
  urlUpdateScucursalProducto: string = 'http://localhost:3001/api/sucursal/sucursalUpdateProducto';
  //http://localhost:3001/api/sucursal/sucursalUpdateProducto/1/1

  constructor(private http: HttpClient) {}

  public getListScucursales(): Observable<SucursalModel[]>{
    return this.http.get<SucursalModel[]>(this.urlApi+'/list');
  }

  /**
   * Busca las sucursales por usuario
   * @param user
   * @returns
   */
  public searchSucursalByUser(user: string): Observable<SucursalUsuario> {
    return this.http.get<SucursalUsuario>(`${this.urlApi}/search/${user}`);
  }

  /**
   * @url http://localhost:3001/api/sucursal/createUser
   * @param user 
   * @returns 
   */
  public createUserSucursal(user: SucursalUsuario): Observable<any> {
    return this.http.post<any>(this.urlApi+`/createUser`, user);
  }

  /**
   * Selecciona los productos de una sucursal, por usuario logeado
   * @param username
   * @returns
   */
  public getProductosSucursal(
    username: string
  ): Observable<SucursalProducto[]> {
    return this.http.get<SucursalProducto[]>(`${this.urlApi}/${username}`);
  }

  public searchScurusalByCodigoProducto(
    codigoSucursal: number,
    codigoProducto: number
  ): Observable<SucursalProductoModel> {
    return this.http.get<SucursalProductoModel>(
      `${this.urlApiSucuralProducto}/${codigoSucursal}/${codigoProducto}`
    );
  }

  public createScursalProducto(
    producto: SucursalProductoModel
  ): Observable<any> {
    return this.http.post<any>(this.urlApi + `/insert`, producto);
  }

  public updateScursalProducto(
    codigoSucursal: number,
    codigoProducto: number,
    producto: SucursalProductoModel
  ): Observable<SucursalProductoModel> {
    return this.http.put<SucursalProductoModel>(
      this.urlUpdateScucursalProducto + `/${codigoSucursal}/${codigoProducto}`,
      producto
    );
  }
}
