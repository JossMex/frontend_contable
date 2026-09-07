import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Articulo, PortalService } from '../../core/services/portal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{

  articulos: Articulo[] = [];
  cargando: boolean = false;

  constructor(
    private portalService: PortalService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.cargando = true;
      this.portalService.getArticulosPublicados().subscribe({
        next: (data) => {
          this.articulos = data;
          this.cargando = false;
        },
        error: () => this.cargando = false
      });
  }

  verArticulo(id: number): void{
    this.router.navigate(['/blog', id])
  }
}
