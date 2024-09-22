import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { BodegaProductModel } from 'src/app/objetos/interfaces/BodegaProductModel';
import { BodegaProducto } from 'src/app/objetos/interfaces/BodegaProducto';
import { Mensaje } from 'src/app/objetos/interfaces/Mensaje';
import { Producto } from 'src/app/objetos/interfaces/Producto';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceBodegaService } from 'src/app/services/service-bodega/ServiceBodega.service';
import { ServiceProductService } from 'src/app/services/service-product/ServiceProduct.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-bodega-registro-product',
  templateUrl: './bodega-registro-product.component.html',
  styleUrls: ['./bodega-registro-product.component.css'],
})
export class BodegaRegistroProductComponent implements OnInit {
  products: Producto[] = [];

  productsBodega: BodegaProducto[] = [];

  user: Usuario;

  form: FormGroup;

  form2: FormGroup;

  productoAuxi!: BodegaProducto;
  productSearch: Producto | undefined;

  mensaje!: Mensaje;

  constructor(
    private sesionService: SesionService,
    private router: Router,
    private serviceProduct: ServiceProductService,
    private serviceBodega: ServiceBodegaService,
    private formBuilder: FormBuilder
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;

    this.form = this.formBuilder.group({
      cantidad: [0, [Validators.required, Validators.min(1)]],
      codigoProducto: [0, Validators.required],
    });

    //formu para registrar producto nuevo
    this.form2 = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(45)]],
      precio: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.sesionService.validarSesion();
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.BODEGA) {
        this.router.navigate(['/login']);
      }
    }

    this.setProducts();
    this.setBodegaProducts();
  }

  public agregarProduct(): void {
    const cantidad = this.form.value.cantidad;
    const codigoProducto = this.form.value.codigoProducto;

    const auxiProducto = this.searchProductOfBodega(parseInt(codigoProducto));
    console.log('buscdo ', auxiProducto);
    if (auxiProducto) {
      Swal.fire({
        title:
          'El producto ya se encuentra en bodega, verifica el listado de productos.',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2c3e50',
      });
    } else {
      Swal.fire({
        title: '¿Quiéres guardar los cambios?',
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: 'Cancelar',
        background: '#ececec',
        confirmButtonColor: '#2c3e50',
        color: '#2c3e50',
      }).then((result) => {
        if (result.isConfirmed) {
          this.productoAuxi = this.productsBodega[1];
          const agregando: BodegaProductModel = {
            codigo_bodega: this.productoAuxi.bodega,
            codigo_producto: parseInt(codigoProducto),
            cantidad: parseInt(cantidad),
          };
          console.log('agreggando ', agregando);
          this.serviceBodega.insertProductBodega(agregando).subscribe({
            next: (value) => {
              this.mensaje = value;
              Swal.fire({
                title: 'Se registró correctamente el producto.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#2c3e50',
              });
            },
            error: (error) => {
              Swal.fire({
                title: 'Lo sentimos no se pudo registrar el producto!',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#c6313a',
              });
            },
          });
        }
      });
    }
  }

  private searchProductOfBodega(
    codigoProducto: number
  ): BodegaProducto | undefined {
    return this.productsBodega.find(
      (product) => product.codigo == codigoProducto
    );
  }

  private searchProductOfGeneralProducts(
    codigoProducto: number
  ): Producto | undefined {
    return this.products.find((prodct) => prodct.codigo == codigoProducto);
  }

  public registrarNuevo(): void {
    const precio = this.form2.value.precio;
    const nombre = this.form2.value.nombre;
    let nuevo = new Producto();
    nuevo.codigo = 0;
    nuevo.nombre = nombre;
    nuevo.precio = precio;
    if (nombre && precio) {
      Swal.fire({
        title: '¿Quiéres guardar los cambios?',
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: 'Cancelar',
        background: '#ececec',
        confirmButtonColor: '#2c3e50',
        color: '#2c3e50',
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceProduct.insertProd(nuevo).subscribe(
            () => {
              this.setProducts();
              Swal.fire({
                title: 'Se guardo correctamente el producto',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#2c3e50',
              });
            },
            (error) => {
              Swal.fire({
                title: 'Lo sentimos no se pudo guardar el producto!',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#c6313a',
              });
            }
          );
        }
      });
    }
  }

  public setProducts(): void {
    this.serviceProduct.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  public setBodegaProducts(): void {
    this.serviceBodega.getProducts(this.user.username).subscribe((data) => {
      this.productsBodega = data;
    });
  }
}
