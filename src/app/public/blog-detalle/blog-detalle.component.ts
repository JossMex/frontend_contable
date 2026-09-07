import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Articulo, PortalService } from '../../core/services/portal.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-blog-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './blog-detalle.component.html',
  styleUrl: './blog-detalle.component.css'
})

export class BlogDetalleComponent implements OnInit{

  articulo: Articulo | null = null;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private portalService: PortalService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.cargando = true;
        this.portalService.getArticuloPublico(Number(id)).subscribe({
          next: (data) => {
            this.articulo = data;
            this.cargando = false
          },
          error: () => {
            this.error = 'Articulo no encontrado';
            this.cargando = false;
          }
        });
      }
  }

}
