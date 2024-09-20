import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Producto } from 'src/app/objetos/interfaces/Producto';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-bodega-registro-product',
  templateUrl: './bodega-registro-product.component.html',
  styleUrls: ['./bodega-registro-product.component.css'],
})
export class BodegaRegistroProductComponent implements OnInit {
  products: Producto[] = [];

  user: Usuario;

  constructor(private sesionService: SesionService, private router: Router) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;
  }

  ngOnInit(): void {
    this.sesionService.validarSesion();
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.BODEGA) {
        this.router.navigate(['/login']);
      }
    }
  }
}
