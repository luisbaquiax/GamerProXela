import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  user: Usuario;
  constructor(private router: Router) {
    this.user = JSON.parse('{}');
  }

  public validarSesion(){
    let userString = localStorage.getItem('userLogin');
    if(userString == null){
      this.router.navigate(['/login']);
    }else{
      this.user = JSON.parse(userString);
    }
  }

  public cerrarSesion(){
    localStorage.removeItem('userLogin');
    this.router.navigate(['/login']);
  }
}
