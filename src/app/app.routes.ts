import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin', redirectTo:  'admin/login', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [authGuard]},
];
