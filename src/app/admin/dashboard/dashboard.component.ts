import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PortalService } from '../../core/services/portal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  nombre: string = '';
  totalServicios: number = 0;
  totalArticulos: number = 0;
  mensajesNoLeidos: number = 0;
  cargando: boolean = true;

  constructor(
    private authService: AuthService,
    private portalService: PortalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nombre = this.authService.getNombre() || '';
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    // Cargamos los 3 contadores en paralelo
    this.portalService.getServiciosAdmin().subscribe({
      next: (data) => this.totalServicios = data.length,
      error: () => this.totalServicios = 0
    });

    this.portalService.getArticulosAdmin().subscribe({
      next: (data) => this.totalArticulos = data.length,
      error: () => this.totalArticulos = 0
    });

    this.portalService.getMensajesNoLeidos().subscribe({
      next: (data) => {
        this.mensajesNoLeidos = data.noLeidos;
        this.cargando = false;
      },
      error: () => {
        this.mensajesNoLeidos = 0;
        this.cargando = false;
      }
    });
  }

  irA(ruta: string): void {
    this.router.navigate([ruta]);
  }

  hoy = new Date();
}
