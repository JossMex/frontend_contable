import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PortalService } from '../../core/services/portal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent  implements OnInit{

  nombre: string = '';
  noLeidos: number = 0;

  constructor(
    private authService: AuthService,
    private portalService: PortalService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.nombre = this.authService.getNombre() || '';
    this.cargarNoLeidos();
  }

  cargarNoLeidos(): void {
    this.portalService.getMensajesNoLeidos().subscribe({
      next: (data) => this.noLeidos = data.noLeidos,
      error: () => this.noLeidos = 0
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
