import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/objetos/interfaces/Producto';

@Injectable({
  providedIn: 'root',
})
export class ServiceProductService {
  urlApi: string = 'http://localhost:3001/api/products';

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlApi);
  }

  public insertProd(product: Producto) {
    return this.http.post(this.urlApi + '/insert', product);
  }
}
