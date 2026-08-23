import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AdminServiciosComponent } from './admin/admin-servicios/admin-servicios.component';
import { AdminArticulosComponent } from './admin/admin-articulos/admin-articulos.component';
import { AdminMensajesComponent } from './admin/admin-mensajes/admin-mensajes.component';


export const routes: Routes = [
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin', redirectTo:  'admin/login', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [authGuard]},
  { path: 'admin/servicios', component: AdminServiciosComponent, canActivate: [authGuard]},
  { path: 'admin/articulos', component: AdminArticulosComponent, canActivate: [authGuard]},
  { path: 'admin/mensajes', component: AdminMensajesComponent, canActivate: [authGuard]}
];
