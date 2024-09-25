import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceInventarioService {

  url: string = 'http://localhost';

  constructor(private http: HttpClient) { }

  

}
