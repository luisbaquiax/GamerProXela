import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-menu-cajero',
  templateUrl: './menu-cajero.component.html',
  styleUrls: ['./menu-cajero.component.css'],
})
export class MenuCajeroComponent implements OnInit {
  user: Usuario;

  constructor(private router: Router, private sesionService: SesionService) {
    let userString = localStorage.getItem('userLogin');
    this.user = userString ? JSON.parse(userString) : null;
  }

  ngOnInit(): void {
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.CAJERO) {
        this.router.navigate(['/login']);
      }
    }
    this.sesionService.validarSesion();
  }
  public singOut() {
    this.sesionService.cerrarSesion();
  }
}
