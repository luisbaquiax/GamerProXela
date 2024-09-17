import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(45)]],
      password: ['', [Validators.required], Validators.maxLength(100)]
    });
  }

  ngOnInit(): void {}

  irMenu() {
    console.log('login')
    this.router.navigate(['admin-menu']);
  }
}
