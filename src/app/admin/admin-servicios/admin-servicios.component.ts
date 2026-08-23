import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortalService, Servicio } from '../../core/services/portal.service';

@Component({
  selector: 'app-admin-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './admin-servicios.component.html',
  styleUrl: './admin-servicios.component.css'
})
export class AdminServiciosComponent implements OnInit{

  servicios: Servicio[] = [];
  cargando: boolean = false;
  mensaje: string = '';
  error: string = '';

  // Formulario para crear y editar
  // null = modo crear, numero = modo editar
  editandoId: number | null = null;
  mostrarFormulario: boolean = false;

  form: Servicio = {
    titulo: '',
    descripcion: '',
    icono: '',
    orden: 0,
    activo: true
  };

  constructor(private portalService: PortalService){}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.cargando = true;
    this.portalService.getServiciosAdmin().subscribe({
      next: (data) => {
        this.servicios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar servicios';
        this.cargando = false;
      }
    });
  }

  abrirFormularioNuevo(): void {
    this.editandoId = null;
    this.form = { titulo: '', descripcion: '', icono: '', orden: 0, activo: true };
    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';
  }

  abrirFormularioEditar(servicio: Servicio): void {
    this.editandoId = servicio.id!;
    this.form ={...servicio};
    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editandoId = null;
  }

  guardar(): void {
    if(!this.form.titulo.trim()) {
      this.error = 'El título es obligatorio';
      return;
    }
    if (this.editandoId) {
      // Modo editar
      this.portalService.actualizarServicio(this.editandoId, this.form).subscribe({
        next: () => {
          this.mensaje = 'Servicio actualizado correctamente';
          this.mostrarFormulario = false;
          this.cargarServicios();
        },
        error: () => this.error = 'Error al actualizar el servicio'
      });
    } else {
      // Modo crear
      this.portalService.crearServicio(this.form).subscribe({
        next: () => {
          this.mensaje = 'Servicio creado correctamente';
          this.mostrarFormulario = false;
          this.cargarServicios();
        },
        error: () => this.error = 'Error al crear el servicio'
      });
    }
  }

  toggle(servicio: Servicio): void {
    this.portalService.toggleServicio(servicio.id!).subscribe({
      next: () => this.cargarServicios(),
      error: () => this.error = 'Error al cambiar el estado'
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar el servicio permanentemente?')) return;
    this.portalService.eliminarServicio(id).subscribe({
      next: () => {
        this.mensaje = 'Servicio eliminado correctamente';
        this.cargarServicios();
      },
      error: () => this.error = 'Error al eliminar el servicio'
    });
  }
}
