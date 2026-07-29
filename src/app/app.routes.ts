import { LoginComponent } from './admin/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin', redirectTo:  'admin/login', pathMatch: 'full' },
  { path: 'admin/dashboard', component: LoginComponent }
];
