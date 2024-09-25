import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoCustomer } from 'src/app/objetos/enum/EstadoCustomer';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Customer } from 'src/app/objetos/interfaces/Customers';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceCustomersService } from 'src/app/services/service-customers/ServiceCustomers.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-cutomers',
  templateUrl: './admin-cutomers.component.html',
  styleUrls: ['./admin-cutomers.component.css'],
})
export class AdminCutomersComponent implements OnInit {
  user: Usuario;
  customers: Customer[] = [];
  public estadoCustomer = EstadoCustomer;

  constructor(
    private sesion: SesionService,
    private router: Router,
    private serviceCustomer: ServiceCustomersService
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;

    this.setCustomers();
  }
  ngOnInit(): void {
    this.sesion.validarSesion();
    if (this.user.tipo != TipoUsuario.ADMIN) {
      this.router.navigate(['/login']);
    }
  }

  public setCustomers(): void {
    this.serviceCustomer.getCustomersByStatus(EstadoCustomer.SOLICITAR).subscribe((data) => {
      this.customers = data;
    });
  }

  public aprobarSolicitud(customer: Customer): void {
    customer.estado = EstadoCustomer.MODIFICABLE;
    this.serviceCustomer.updateCustomer(customer.nit, customer).subscribe(
      (data) => {
        this.customers = this.customers.filter(c => c.nit !== customer.nit);
        Swal.fire({
          title: 'Se ha aprobado la solicitud.',
          icon:'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2c3e50',
        });
      },
      (error) => {
        Swal.fire({
          title: 'No se pudo guardar los cambios lo sentimos!',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#c6313a',
        });
      }
    );
    
  }
}
