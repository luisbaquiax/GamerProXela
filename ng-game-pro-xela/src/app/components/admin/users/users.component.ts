import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { SesionService } from 'src/app/services/sesion/Sesion.service';
import { UsersService } from 'src/app/services/Users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Usuario[] = [];

  user: Usuario;
  constructor(private sesion: SesionService, private router: Router, private userService: UsersService) {
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson? JSON.parse(userJson) : null;
    this.setUsers();
  }
  ngOnInit(): void {
    this.sesion.validarSesion();
    if(this.user!=null){
      if(this.user.tipo!== TipoUsuario.ADMIN){
        this.router.navigate(['/login']);
      }
    }
  }

  public setUsers(): void {
    this.userService.getUsers().subscribe((list) => {
      this.users = list;
    });
  }

}
