import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-bodega-menu',
  templateUrl: './bodega-menu.component.html',
  styleUrls: ['./bodega-menu.component.css'],
})
export class BodegaMenuComponent implements OnInit {
  user: Usuario;

  constructor(private serviceSesion: SesionService, private router: Router) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;
  }

  ngOnInit(): void {
    this.serviceSesion.validarSesion();

    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.BODEGA) {
        this.router.navigate(['/login']);
      }
    }
  }
  public singOut() {
    this.serviceSesion.cerrarSesion();
  }
}
