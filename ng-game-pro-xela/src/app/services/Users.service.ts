import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../objetos/interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  urlApi: string = 'http://localhost:3001/api/users';
  constructor(private http: HttpClient) { }
  
  /**
   * router.get("/:username/:password", searchUser)
   * @param username 
   * @returns 
   */
  public saearchUsers(username: string, password: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlApi+`/${username}/${password}`);
  }

  public createUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlApi, +`/${user}`);
  }
}
