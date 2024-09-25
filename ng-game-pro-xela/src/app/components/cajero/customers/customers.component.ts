import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoCustomer } from 'src/app/objetos/enum/EstadoCustomer';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Customer } from 'src/app/objetos/interfaces/Customers';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceCustomersService } from 'src/app/services/service-customers/ServiceCustomers.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  public estadoCustomer = EstadoCustomer;
  user: Usuario;

  form: FormGroup;

  constructor(
    private sesion: SesionService,
    private router: Router,
    private serviceCustomer: ServiceCustomersService,
    private fb: FormBuilder
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;
    this.setCustomers();

    this.form = this.fb.group({
      nit: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required, Validators.minLength(45)]],
    });
  }
  ngOnInit(): void {
    this.sesion.validarSesion();
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.CAJERO) {
        this.router.navigate(['/login']);
      }
    }
  }

  public setCustomers(): void {
    this.serviceCustomer.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });
  }

  public solicitarModificacion(customer: Customer): void {
    customer.estado = EstadoCustomer.SOLICITAR;
    this.serviceCustomer.updateCustomer(customer.nit, customer).subscribe(
      (data) => {
        Swal.fire({
          title: 'Se ha enviado la solicitud correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2c3e50',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Lo sentimos no se pudo registrar el producto!',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#c6313a',
        });
      }
    );
  }

  public setValue(p: Customer): void {
    this.form.patchValue({
      nombre: p.nombre
    });
  }

  public saveChanges(customer: Customer): void {
    console.log(customer);
    const nombre = this.form.value.nombre;
    customer.nombre = nombre;
    console.log(customer);
    this.serviceCustomer.updateCustomer(customer.nit, customer).subscribe(
      (data) => {
        Swal.fire({
          title: 'Se ha actualizado los datos del cliente correctamente.',
          icon:'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2c3e50',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Lo sentimos no se pudieron guardar los cambios!',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#c6313a',
        });
      }
    );
  }
}
