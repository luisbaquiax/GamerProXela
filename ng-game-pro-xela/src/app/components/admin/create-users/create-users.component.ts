import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoUsuario } from 'src/app/objetos/enum/EstadoUsuario';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { SucursalModel } from 'src/app/objetos/interfaces/SucursalModel';
import { SucursalUsuario } from 'src/app/objetos/interfaces/SucursalUsuario';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceSucursalService } from 'src/app/services/service-sucursal/ServiceSucursal.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';
import { UsersService } from 'src/app/services/Users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css'],
})
export class CreateUsersComponent implements OnInit {
  form: FormGroup;

  tipoSeleccionados!: string;

  sucursales: SucursalModel[] = [];
  tipos: string[] = [
    TipoUsuario.BODEGA,
    TipoUsuario.CAJERO,
    TipoUsuario.INVENTARIO,
  ];
  estados: string[] = [EstadoUsuario.ACTIVO, EstadoUsuario.DESACTIVADO];

  showSucursal: boolean = false;
  showLegendUsername: boolean = false;

  username: string = '';

  user: Usuario;
  constructor(
    private sesion: SesionService,
    private serviceSucursales: ServiceSucursalService,
    private serviceUsers: UsersService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private fb: FormBuilder
  ) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson ? JSON.parse(userJson) : null;
    this.setSucursales();

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(45)]],
      password: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      sucursal: [0, Validators.required],
    });

    this.username = String(this.routerActive.snapshot.paramMap.get('username'));
  }

  ngOnInit(): void {
    this.sesion.validarSesion();
    if (this.user != null) {
      if (this.user.tipo != TipoUsuario.ADMIN) {
        this.router.navigate(['/login']);
      }
    }
  }

  public setSucursales(): void {
    this.serviceSucursales.getListScucursales().subscribe((list) => {
      this.sucursales = list;
    });
  }

  public userRegister(): void {
    let userCreate: Usuario = {
      username: this.form.value.username,
      password: this.form.value.password,
      tipo: this.form.value.tipo,
      estado: this.form.value.estado,
    };

    if (userCreate.tipo != TipoUsuario.BODEGA) {
      this.serviceUsers.createUser(userCreate).subscribe(
        (data) => {
          let userSucursal: SucursalUsuario = {
            codigo_sucursal: this.form.value.sucursal,
            username_usuario: userCreate.username,
          };
          this.serviceSucursales.createUserSucursal(userSucursal).subscribe(
            (data) => {
              Swal.fire({
                title: 'Usuario creado correctamente',
                icon: 'success',
                confirmButtonText: 'oK',
                confirmButtonColor: '#2c3e50',
              });
            },
            (error) => {
              Swal.fire({
                title: 'Error',
                text: 'No se pudo crear asginar el usuario al la sucursal.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#c6313a',
              });
            }
          );
        },
        (error) => {
          if (error.status == 500) {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo crear al usuario',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#c6313a',
            });
          }
        }
      );
    } else {
      //caso que el usuario sea BODEGA
      userCreate.estado = EstadoUsuario.DESACTIVADO;
      console.log(userCreate);
      this.serviceUsers.createUser(userCreate).subscribe(
        (data) => {
          Swal.fire({
            title:
              'Usuario creado correctamente. Por defecto estara desactivado, no se le asginará una bodega.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2c3e50',
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo crear al usuario.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#c6313a',
          });
        }
      );
    }
  }

  public isSelected(): void {
    const tipo = this.form.value.tipo;
    if (tipo == TipoUsuario.CAJERO || tipo == TipoUsuario.INVENTARIO) {
      this.showSucursal = true;
    } else {
      this.showSucursal = false;
    }
  }

  public searchUsername(): void {
    this.serviceUsers.searchUserByUsername(this.form.value.username).subscribe(
      (user) => {
        this.showLegendUsername = true;
      },
      (error) => {
        if (error.status == 404) {
          this.showLegendUsername = false;
        }
      }
    );
  }
}
