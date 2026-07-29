import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  scrolled = false; // cambia el estilo al hacer scroll
  menuAbierto = false; // para el menú hamburguesa en móvil

  // Detecta el scroll de la página y cambia el estilo del navbar
  @HostListener('window:scroll')
  onScroll(){
    this.scrolled = window.scrollY > 50;
  }

  ngOnInit(): void {}

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
