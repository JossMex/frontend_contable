import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MensajeContacto, PortalService } from '../../core/services/portal.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})

export class ContactoComponent {

  form: MensajeContacto = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  };

  enviando: boolean = false;
  enviado: boolean = false;
  error: string = '';

  constructor(private portalService: PortalService){}

  enviar(): void {
    if (!this.form.nombre || !this.form.email || !this.form.mensaje){
      this.error = 'Porfavor completa los campos obligatorios';
      return;
    }

    this.enviando = true,
    this.error = '';

    this.portalService.enviarMensaje(this.form).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false
        this.form = {nombre: '', email: '', telefono: '', asunto: '', mensaje: ''}
      },
      error: () => {
        this.error = 'Error al enviar  mensaje. Inténtalo de nuevo.';
        this.enviando = false;
      }
    });
  }

}
