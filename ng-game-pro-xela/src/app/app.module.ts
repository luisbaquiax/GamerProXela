import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RealizarVentaComponent } from './components/cajero/realizar-venta/realizar-venta.component';
import { CustomersComponent } from './components/cajero/customers/customers.component';
import { CreateUsersComponent } from './components/admin/create-users/create-users.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    RealizarVentaComponent,
    CustomersComponent,
    CreateUsersComponent,
    UsersComponent,
    AdminCustomersComponent,
    AdminMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
