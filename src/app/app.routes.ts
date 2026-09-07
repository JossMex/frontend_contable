import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AdminServiciosComponent } from './admin/admin-servicios/admin-servicios.component';
import { AdminArticulosComponent } from './admin/admin-articulos/admin-articulos.component';
import { AdminMensajesComponent } from './admin/admin-mensajes/admin-mensajes.component';
import { InicioComponent } from './public/inicio/inicio.component';
import { ServiciosComponent } from './public/servicios/servicios.component';
import { BlogComponent } from './public/blog/blog.component';
import { BlogDetalleComponent } from './public/blog-detalle/blog-detalle.component';
import { ContactoComponent } from './public/contacto/contacto.component';


export const routes: Routes = [

  //Públicas
  { path: '', component: InicioComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: BlogDetalleComponent},
  { path: 'contacto', component: ContactoComponent},

  // Admin
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin', redirectTo:  'admin/login', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [authGuard]},
  { path: 'admin/servicios', component: AdminServiciosComponent, canActivate: [authGuard]},
  { path: 'admin/articulos', component: AdminArticulosComponent, canActivate: [authGuard]},
  { path: 'admin/mensajes', component: AdminMensajesComponent, canActivate: [authGuard]}
];
