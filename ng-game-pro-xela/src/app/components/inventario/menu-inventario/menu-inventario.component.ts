import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-menu-inventario',
  templateUrl: './menu-inventario.component.html',
  styleUrls: ['./menu-inventario.component.css'],
})
export class MenuInventarioComponent implements OnInit {
  user: Usuario;
  constructor(private sesionService: SesionService) {
    let usrJSON = localStorage.getItem('userLogin');
    this.user = usrJSON ? JSON.parse(usrJSON) : null;
  }

  ngOnInit(): void {
    this.sesionService.validarSesion();
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.INVENTARIO) {
        this.sesionService.cerrarSesion();
      }
    }
  }

  public singOut() {
    this.sesionService.cerrarSesion();
  }
}
