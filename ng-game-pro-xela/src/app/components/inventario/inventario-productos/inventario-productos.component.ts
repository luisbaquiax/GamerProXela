import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { BodegaProducto } from 'src/app/objetos/interfaces/BodegaProducto';
import { SucursalProducto } from 'src/app/objetos/interfaces/SucursalProducto';
import { SucursalProductoModel } from 'src/app/objetos/interfaces/SucursalProductoModel';
import { SucursalUsuario } from 'src/app/objetos/interfaces/SucursalUsuario';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { InventarioService } from 'src/app/services/Inventario.service';
import { ServiceBodegaService } from 'src/app/services/service-bodega/ServiceBodega.service';
import { ServiceSucursalService } from 'src/app/services/service-sucursal/ServiceSucursal.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario-productos',
  templateUrl: './inventario-productos.component.html',
  styleUrls: ['./inventario-productos.component.css'],
})
export class InventarioProductosComponent implements OnInit {
  productos: BodegaProducto[] = [];
  user: Usuario;

  productosEstanteria: SucursalProducto[] = [];
  sucursalUser!: SucursalUsuario;
  sucuraProdctoModel!: SucursalProductoModel;

  forms!: FormArray;

  constructor(
    private sesionService: SesionService,
    private router: Router,
    private serviceInventario: InventarioService,
    private serviceSucursal: ServiceSucursalService,
    private serviceBodega: ServiceBodegaService,
    private fb: FormBuilder
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;

    this.serviceSucursal
      .searchSucursalByUser(this.user.username)
      .subscribe((data) => {
        this.sucursalUser = data;
      });
  }

  ngOnInit(): void {
    this.sesionService.validarSesion();
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.INVENTARIO) {
        this.router.navigate(['login']);
      }
    }
    this.setProductos();
  }

  public setProductos(): void {
    this.serviceInventario.getProductosInventario(1).subscribe((list) => {
      this.productos = list;
      this.generarFomrs();
    });
  }

  public setProductosEstanteria(): void {
    this.serviceSucursal
      .getProductosSucursal(this.user.username)
      .subscribe((list) => {
        this.productosEstanteria = list;
      });
  }

  public generarFomrs(): void {
    this.forms = this.fb.array([]);
    this.productos.forEach(() => {
      this.forms.push(
        this.fb.group({
          cantidad: [0, [Validators.required, Validators.min(1)]],
        })
      );
    });
  }

  public getForm(index: number): FormGroup {
    return this.forms.at(index) as FormGroup;
  }

  async trasladarProductos(producto: BodegaProducto, index: number) {
    const { value: pasillo } = await Swal.fire({
      title: 'Ingresa el número de pasillo',
      input: 'number',
      inputLabel: 'Número de pasilo del producto',
      inputAttributes: {
        min: '0',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#2c3e50',
      cancelButtonText: 'Cancelar',
      background: '#ececec',
    });
    const cantidad = this.getForm(index).value.cantidad;
    if (cantidad <= producto.cantidad) {
      if (pasillo) {
        if (this.sucursalUser) {
          // codigo_sucursal, codigo_producto
          this.serviceSucursal
            .searchScurusalByCodigoProducto(
              this.sucursalUser.codigo_sucursal,
              producto.codigo
            )
            .subscribe((data) => {
              this.sucuraProdctoModel = data;
              //acutualizar bodega
              this.actualizarBodega(producto, cantidad);
              //actualizar sucursal-producto
              this.actualizarSucursalProducto(producto, cantidad);
            });
          //actualizar bodega
        }
      }
    } else {
      Swal.fire({
        title: 'No se puede trasladar más productos de los que existen.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#c6313a',
      });
    }
  }

  public actualizarBodega(producto: BodegaProducto, cantidad: number): void {
    producto.cantidad = producto.cantidad - cantidad;
    this.serviceBodega
      .updateProductoBodega(producto.bodega, producto.codigo, producto)
      .subscribe((data) => {});
  }

  public actualizarSucursalProducto(producto: BodegaProducto, cantidad: number): void {
    this.sucuraProdctoModel.cantidad = this.sucuraProdctoModel.cantidad + cantidad;
    this.serviceSucursal
      .updateScursalProducto(
        this.sucursalUser.codigo_sucursal,
        producto.codigo,
        this.sucuraProdctoModel
      )
      .subscribe(
        (data) => {
          Swal.fire({
            title: 'Producto trasladado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2c3e50',
          });
        },
        (err) => {
          Swal.fire({
            title: 'Error al trasladar el producto.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#c6313a',
          });
        }
      );
  }

  public procesarTraslado(): void {}
}
