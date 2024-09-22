import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { UsersService } from 'src/app/services/Users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(45)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {}

  irMenu() {
    //marca como tocado el formulario
    this.form.markAllAsTouched();
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.usersService.saearchUsers(username, password).subscribe(
      (user) => {
      if (user != null) {
        localStorage.setItem('userLogin', JSON.stringify(user));
        if (user.tipo === TipoUsuario.ADMIN) {
          this.router.navigate(['admin-menu']);
        } else if (user.tipo === TipoUsuario.CAJERO){
          this.router.navigate(['cajero-menu']);
        }else if(user.tipo === TipoUsuario.BODEGA){
          this.router.navigate(['bodega-menu']);
        }else if(user.tipo === TipoUsuario.INVENTARIO){
          this.router.navigate(['inventario-menu']);
        }
      }
    }, (error) => {
      alert("Contraseña o nombre de usuario incorrectos.");
    }
    );
  }
}
