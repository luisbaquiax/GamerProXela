import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css'],
})
export class AdminMenuComponent implements OnInit {
  form: FormGroup;

  user!: Usuario;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sesionService: SesionService
  ) {
    this.form = this.fb.group({});
    let userString = localStorage.getItem('userLogin');
    this.user = userString ? JSON.parse(userString) : null;
  }

  ngOnInit(): void {
    if(this.user!=null){
      if(this.user.tipo != TipoUsuario.ADMIN){
        this.router.navigate(['/login']);
      }
    }
    this.sesionService.validarSesion();
  }

  singOut(): void {
    this.sesionService.cerrarSesion();
  }
}
