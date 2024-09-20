import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { CreateUsersComponent } from './components/admin/create-users/create-users.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { MenuCajeroComponent } from './components/cajero/menu-cajero/menu-cajero.component';
import { CustomersComponent } from './components/cajero/customers/customers.component';
import { RealizarVentaComponent } from './components/cajero/realizar-venta/realizar-venta.component';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { ProductosComponent } from './components/cajero/productos/productos.component';
import { BodegaMenuComponent } from './components/bodega/bodega-menu/bodega-menu.component';
import { BodegaProductosComponent } from './components/bodega/bodega-productos/bodega-productos.component';
import { BodegaRegistroProductComponent } from './components/bodega/bodega-registro-product/bodega-registro-product.component';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin-menu', component: AdminMenuComponent},
  {path: 'admin-users', component: UsersComponent},
  {path: 'admin-create-users', component: CreateUsersComponent},
  {path: 'admin-customers', component: AdminCustomersComponent},
  {path: 'admin-reports/:reporte', component: ReportesComponent},
  {path: 'cajero-menu', component: MenuCajeroComponent},
  {path: 'cajero-customers', component: CustomersComponent},
  {path: 'cajero-venta', component: RealizarVentaComponent},
  {path: 'cajero-products', component: ProductosComponent},
  {path: 'bodega-menu', component: BodegaMenuComponent},
  {path: 'bodega-products', component: BodegaProductosComponent},
  {path: 'bodega-registro-producto', component: BodegaRegistroProductComponent},
  {path:'**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
