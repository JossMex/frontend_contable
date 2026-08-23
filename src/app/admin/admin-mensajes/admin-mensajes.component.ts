import { MensajeContacto, PortalService } from './../../core/services/portal.service';
import { AdminNavbarComponent } from './../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-mensajes',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent],
  templateUrl: './admin-mensajes.component.html',
  styleUrl: './admin-mensajes.component.css'
})
export class AdminMensajesComponent implements OnInit{

  mensajes: MensajeContacto[] = [];
  cargando: boolean = false;
  mensaje: string = '';
  error: string = '';
  noLeidos: number = 0;

  // Para ver el detalle de un mensaje en un modal
  mensajeSeleccionado: MensajeContacto | null = null;

  constructor(private portalService: PortalService){}

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes(): void {
    this.cargando = true;
    this.portalService.getMensajesAdmin().subscribe({
      next: (data) => {
        this.mensajes = data;
        this.noLeidos = data.filter(m => !m.leido).length;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar mensajes';
        this.cargando = false;
      }
    });
  }

  verDetalle(mensaje: MensajeContacto): void {
    this.mensajeSeleccionado = mensaje;
    // Si no esta leído lo marcamos automáticamente al abrirlo
    if(!mensaje.leido) {
      this.portalService.toggleMensaje(mensaje.id!).subscribe({
        next: () => this.cargarMensajes()
      });
    }
  }

  cerrarDetalle(): void {
    this.mensajeSeleccionado = null;
  }

  toggle(mensaje: MensajeContacto): void {
    this.portalService.toggleMensaje(mensaje.id!).subscribe({
      next: () => this.cargarMensajes(),
      error: () => this.error = 'Error al cambiar estado'
    });
  }

  eliminar(id: number): void {
    if(!confirm('¿Eliminar este mensaje?')) return;
    this.portalService.eliminarMensaje(id).subscribe({
      next: () => {
        this.mensaje = 'Mensaje eliminado';
        this.cargarMensajes();
      },
      error: () => this.error = 'Error al eliminar'
    });
  }
}
