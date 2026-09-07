import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PortalService, Servicio } from '../../core/services/portal.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit{

  servicios: Servicio[] = [];
  cargando: boolean = false;

  constructor(private portalService: PortalService){}

  ngOnInit(): void{
    this.cargando = true;
    this.portalService.getServiciosPublicos().subscribe({
      next: (data) => {
        this.servicios = data;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

}
