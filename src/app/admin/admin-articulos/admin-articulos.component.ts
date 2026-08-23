import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Articulo, PortalService } from '../../core/services/portal.service';

@Component({
  selector: 'app-admin-articulos',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './admin-articulos.component.html',
  styleUrl: './admin-articulos.component.css'
})
export class AdminArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  cargando: boolean = false;
  mensaje: string = '';
  error: string = '';
  editandoId: number | null = null;
  mostrarFormulario: boolean = false;

  form: Articulo = {
    titulo: '',
    resumen: '',
    contenido: '',
    publicado: false,
  };

  constructor(private portalService: PortalService){}

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.cargando = true;
    this.portalService.getArticulosAdmin().subscribe({
      next: (data) => {
        this.articulos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar artículos';
        this.cargando = false;
      }
    });
  }

  abrirFormularioNuevo(): void {
    this.editandoId = null;
    this.form = {titulo: '', resumen: '', contenido: '', publicado: false};
    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';
  }

  abrirFormularioEditar(articulo: Articulo): void {
    this.editandoId = articulo.id!;
    this.form = {...articulo};
    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editandoId = null;
  }

  guardar(): void {
    if(!this.form.titulo?.trim()) {
      this.error = 'El título es obligatorio';
      return;
    }
    if(this.editandoId) {
      this.portalService.actualizarArticulo(this.editandoId, this.form).subscribe({
        next: () => {
          this.mensaje = 'Artículo actualizado correctamente';
          this.mostrarFormulario = false;
          this.cargarArticulos;
        },
        error: () => this.error = 'Error al actualizar el artículo'
      });
    }else {
      this.portalService.crearArticulo(this.form).subscribe({
        next: () => {
          this.mensaje = 'Artículo creado correctamente';
          this.mostrarFormulario = false;
          this.cargarArticulos();
        },
        error: () => this.error = 'Error al crear el artículo'
      });
    }
  }

  toggle(articulo: Articulo): void {
    this.portalService.toggleArticulo(articulo.id!).subscribe({
      next: () => {
        this.mensaje = articulo.publicado
        ? 'Artículo despublicado'
        : 'Artículo publicado correctamente';
        this.cargarArticulos();
      },
      error: () => this.error = 'Error al cambiar el estado'
    });
  }

  eliminar(id: number): void {
    if(!confirm('¿Eliminar este artículo permanentemente?')) return;
    this.portalService.eliminarArticulo(id).subscribe({
      next: () => {
        this.mensaje = 'Artículo eliminado correctamente';
        this.cargarArticulos();
      },
      error: () => this.error = 'Error al eliminar el artículo'
    });
  }

}
