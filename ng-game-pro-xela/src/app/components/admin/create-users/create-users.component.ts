import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  form = this.fb.group({});

  tipoSeleccionados!: string;


  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  hola(): void {
  }
}
