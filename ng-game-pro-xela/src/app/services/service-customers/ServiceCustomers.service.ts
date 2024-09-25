import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/objetos/interfaces/Customers';

@Injectable({
  providedIn: 'root'
})
export class ServiceCustomersService {

  urlApi: string = 'http://localhost:3001/api/customers';
  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.urlApi);
  }

  /**
   * @url http://localhost:3001/api/customers/estado/SOLICITAR
   * @param status 
   * @returns 
   */
  public getCustomersByStatus(status: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.urlApi}/estado/${status}`);
  }

  public updateCustomer(nit: String, customer: Customer): Observable<any>{
    return this.http.put<any>(this.urlApi+`/${nit}`, customer);
  }

  public createCustomer(customer: Customer): Observable<any>{
    return this.http.post<any>(this.urlApi, customer);
  }

  public searchCustomer(nit : String): Observable<Customer>{
    return this.http.get<Customer>(this.urlApi+`/${nit}`);
  }
}
