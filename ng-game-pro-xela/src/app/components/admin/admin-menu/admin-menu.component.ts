import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit{

  form: FormGroup;


  constructor(private router: Router, private fb: FormBuilder){
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    
  }
}
