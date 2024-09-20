import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { BodegaProducto } from 'src/app/objetos/interfaces/BodegaProducto';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceBodegaService } from 'src/app/services/service-bodega/ServiceBodega.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-bodega-productos',
  templateUrl: './bodega-productos.component.html',
  styleUrls: ['./bodega-productos.component.css'],
})
export class BodegaProductosComponent implements OnInit {
  products: BodegaProducto[] = [];

  formArray!: FormArray;

  user: Usuario;
  constructor(
    private sesionService: SesionService,
    private router: Router,
    private fb: FormBuilder,
    private serviceBodega: ServiceBodegaService
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;

    this.setProducts();
  }

  ngOnInit(): void {
    this.sesionService.validarSesion();
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.BODEGA) {
        this.router.navigate(['/login']);
      }
    }

    this.setProducts();
  }

  public generarFomrs(): void {
    this.formArray = this.fb.array(
      this.products.map(() =>
        this.fb.group({
          cantidad: [0, Validators.required],
        })
      )
    );
  }

  public getFormGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  public setProducts(): void {
    this.serviceBodega.getProducts(this.user.username).subscribe((data) => {
      this.products = data;
      this.generarFomrs();
    });
  }

  public setStock(codigo: number, index: number): void {
    console.log('codigo y indice: ', codigo, index);
    const cantidad = this.getFormGroup(index).value.cantidad;
    console.log(cantidad);
  }
}
