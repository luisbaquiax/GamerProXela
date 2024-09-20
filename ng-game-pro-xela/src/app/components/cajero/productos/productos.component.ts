import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { SucursalProducto } from 'src/app/objetos/interfaces/SucursalProducto';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceSucursalService } from 'src/app/services/service-sucursal/ServiceSucursal.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: SucursalProducto[] = [];

  user: Usuario;

  constructor(
    private serviceSesion: SesionService,
    private router: Router,
    private serviceSucursal: ServiceSucursalService
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;
    this.setProducts();
  }

  ngOnInit(): void {
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.CAJERO) {
        this.router.navigate(['/login']);
      }
    }
    this.serviceSesion.validarSesion();
  }

  public setProducts() {
    this.serviceSucursal
      .getProductosSucursal(this.user.username)
      .subscribe((list) => {
        this.productos = list;
      });
  }
}
