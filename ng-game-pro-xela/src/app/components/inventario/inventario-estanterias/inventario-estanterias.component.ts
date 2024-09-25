import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { SucursalProducto } from 'src/app/objetos/interfaces/SucursalProducto';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceSucursalService } from 'src/app/services/service-sucursal/ServiceSucursal.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-inventario-estanterias',
  templateUrl: './inventario-estanterias.component.html',
  styleUrls: ['./inventario-estanterias.component.css'],
})
export class InventarioEstanteriasComponent implements OnInit {

  productos: SucursalProducto[] = [];

  user: Usuario;
  constructor(
    private sesionService: SesionService,
    private serviceSucursal: ServiceSucursalService,
    private router: Router
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;
  }

  ngOnInit(): void {
    this.sesionService.validarSesion();
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.INVENTARIO) {
        this.router.navigate(['/login']);
      }
    }
    this.setProductos();
  }

  public setProductos(): void {
    this.serviceSucursal.getProductosSucursal(this.user.username).subscribe((list) => {
      this.productos = list;
    });
  }
}
