import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { CreateUsersComponent } from './components/admin/create-users/create-users.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin-menu', component: AdminMenuComponent},
  {path: 'admin-users', component: UsersComponent},
  {path: 'admin-create-users', component: CreateUsersComponent},
  {path: 'admin-customers', component: AdminCustomersComponent},
  {path:'**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
