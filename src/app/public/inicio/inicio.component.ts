import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PortalService, Servicio } from '../../core/services/portal.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  servicios: Servicio[] = [];

  constructor(private portalService: PortalService){}

  ngOnInit(): void {
      // Cargamos los primeros 3 servicios para el resumen del inicio
      this.portalService.getServiciosPublicos().subscribe({
        next: (data) => this.servicios = data.slice(0, 3),
        error: (err) => console.error(err)
      });
  }

}
