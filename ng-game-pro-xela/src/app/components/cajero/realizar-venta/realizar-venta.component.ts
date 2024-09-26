import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoCustomer } from 'src/app/objetos/enum/EstadoCustomer';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Customer } from 'src/app/objetos/interfaces/Customers';
import { DetalleVentaModel } from 'src/app/objetos/interfaces/DetalleVentaModel';
import { SucursalProducto } from 'src/app/objetos/interfaces/SucursalProducto';
import { SucursalProductoModel } from 'src/app/objetos/interfaces/SucursalProductoModel';
import { SucursalUsuario } from 'src/app/objetos/interfaces/SucursalUsuario';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { VentaModel } from 'src/app/objetos/interfaces/VentaModel';
import { ServiceCustomersService } from 'src/app/services/service-customers/ServiceCustomers.service';
import { ServiceSucursalService } from 'src/app/services/service-sucursal/ServiceSucursal.service';
import { ServiceVentaService } from 'src/app/services/service-venta/ServiceVenta.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-realizar-venta',
  templateUrl: './realizar-venta.component.html',
  styleUrls: ['./realizar-venta.component.css'],
})
export class RealizarVentaComponent implements OnInit {
  productos: SucursalProducto[] = [];
  productosVender: SucursalProducto[] = [];
  total: number = 0;
  factura: number = 0;
  fecha: string = '';
  ventas: VentaModel[] = [];
  ventaUltima!: VentaModel;
  form: FormGroup;
  form2: FormGroup;
  formNewCustomer: FormGroup;
  customer: Customer = {
    nit: '',
    nombre: '',
    estado: '',
  };

  user: Usuario;
  sucursalUsuario!: SucursalUsuario;

  constructor(
    private serviceSesion: SesionService,
    private router: Router,
    private fb: FormBuilder,
    private serviceSucursal: ServiceSucursalService,
    private serviceVenta: ServiceVentaService,
    private serviceCustomer: ServiceCustomersService
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;

    this.setProducts();
    this.setFecha();
    this.setFactura();
    this.setScursalUser();

    this.form = this.fb.group({
      codigo: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
    });

    this.form2 = this.fb.group({
      nit: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });

    this.formNewCustomer = this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.maxLength(45)]],
      nitCliente: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }
  ngOnInit(): void {
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.CAJERO) {
        this.router.navigate(['/login']);
      }
    }
    this.serviceSesion.validarSesion();
    this.setFactura();
    this.setProducts();
  }

  public agregarProduct(): void {
    const { codigo, cantidad } = this.form.value;
    const producto = this.getProduct(codigo);

    const productoEncontrado = this.productosVender.find(
      (p) => p.codigo_producto === codigo
    ) as SucursalProducto;
    if (producto.cantidad < cantidad) {
      Swal.fire({
        title: `No hay suficientes unidades del producto: ${producto.producto}`,
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2c3e50',
      });
      return;
    }
    // Validar que el producto no se encuentre en la lista de productos a vender y que la cantidad sea mayor a cero.
    if (productoEncontrado) {
      if (productoEncontrado.cantidad + cantidad > producto.cantidad) {
        Swal.fire({
          title: `No hay suficientes unidades del producto: ${producto.producto}`,
          icon: 'info',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2c3e50',
        });
      } else {
        productoEncontrado.cantidad += cantidad;
      }
    } else {
      this.productosVender.push({
        codigo_sucursal: producto.codigo_sucursal,
        codigo_producto: codigo,
        cantidad: cantidad,
        pasillo: producto.pasillo,
        producto: this.getProduct(codigo).producto,
        precio: this.getProduct(codigo).precio,
      });
    }
    this.total += this.getProduct(codigo).precio * cantidad;
    this.form.reset();
  }

  private getProduct(codigo: number): SucursalProducto {
    return this.productos.find(
      (p) => p.codigo_producto == codigo
    ) as SucursalProducto;
  }

  public setProducts() {
    this.serviceSucursal
      .getProductosSucursal(this.user.username)
      .subscribe((list) => {
        this.productos = list;
      });
  }

  public setScursalUser(): void {
    this.serviceSucursal
      .searchSucursalByUser(this.user.username)
      .subscribe((data) => {
        this.sucursalUsuario = data;
      });
  }

  public setFactura(): void {
    this.serviceVenta.getAllVentas().subscribe(
      (list) => {
        this.ventas = list;
        this.factura = this.ventas[0].codigo + 1;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public searchCustomer(): void {
    const { nit } = this.form2.value;
    this.serviceCustomer.searchCustomer(nit).subscribe(
      (customer) => {
        this.customer = customer;
        console.log(this.customer);
      },
      (error) => {
        Swal.fire({
          title: 'Cliente no encontrado',
          icon: 'info',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2c3e50',
        });
      }
    );
    this.form2.reset();
  }

  public marcarConsumidorFinal(): void {
    this.customer.nit = '00000000';
    this.customer.nombre = 'Consumidor Final'; 
  }

  public registerCustomer(): void {
    const nombreCliente = this.formNewCustomer.value.nombreCliente;
    const nitCliente = this.formNewCustomer.value.nitCliente;
    this.customer.nombre = nombreCliente;
    this.customer.nit = nitCliente;
    this.customer.estado = EstadoCustomer.NO_MODIFICABLE;
    if (nombreCliente && nitCliente) {
      this.serviceCustomer.createCustomer(this.customer).subscribe(
        () => {
          Swal.fire({
            title: 'Cliente registrado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2c3e50',
          });
          this.formNewCustomer.reset();
        },
        (error) => {
          if (error.status == 500) {
            this.customer.nombre = '';
            this.customer.nit = '';
            this.customer.estado = '';
            Swal.fire({
              title: 'Error al registrar el cliente',
              text: 'El NIT ya se encuentra registrado.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#2c3e50',
            });
          } else {
            Swal.fire({
              title: 'Error al registrar el cliente',
              text: 'Hubo un error al registrar el cliente.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#2c3e50',
            });
          }
        }
      );
    } else {
      Swal.fire({
        title: 'Todos los campos son obligatorios',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2c3e50',
      });
    }
  }

  public finalizar(): void {
    if (this.productosVender.length == 0) {
      Swal.fire({
        title: 'No hay productos seleccionados',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2c3e50',
      });
      return;
    }
    if (this.customer.nit == '') {
      Swal.fire({
        title: 'Debe seleccionar un cliente',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2c3e50',
      });
      return;
    }
    let nuevaVenta: VentaModel = {
      codigo: this.factura,
      nit_cliente: this.customer.nit,
      username_usuario: this.user.username,
      fecha: this.fecha,
      total: this.total,
      descuento: 0,
      codigo_sucursal: this.sucursalUsuario.codigo_sucursal,
    };
    this.serviceVenta.createVenta(nuevaVenta).subscribe(
      () => {
        Swal.fire({
          title: 'Venta registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2c3e50',
        });
        //
        //this.setFactura();
      },
      (error) => {
        Swal.fire({
          title: 'Error al registrar la venta.',
          text: 'Hubo un error al registrar la venta.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2c3e50',
        });
      }
    );
    console.log('codigo nueva venta ', nuevaVenta.codigo);
    this.productosVender.forEach((producto) => {
      let detallle: DetalleVentaModel = {
        codigo_venta: this.factura,
        codigo_producto: producto.codigo_producto,
        precio_unitario: producto.precio,
        cantidad: producto.cantidad,
      };
      this.serviceVenta.addProductoVenta(detallle).subscribe(
        () => {
          console.log('producto agregado: ', detallle);
        },
        (err) => {
          console.log('producto detalle: ', detallle);
          console.log('error al agregar producto ', err);
        }
      );
    });
    this.customer.nit = '';
    this.customer.nombre = '';
    this.customer.estado = '';
    this.productosVender = [];
    this.total = 0;
    this.router.navigate(['cajero-menu']);
  }

  public setFecha(): void {
    const date = new Date();
    const yy = String(date.getFullYear()).slice();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    this.fecha = `${yy}-${mm}-${dd}`;
  }
}
