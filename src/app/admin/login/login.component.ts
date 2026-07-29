import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  email: string = '';
  password: string = '';
  error: string = '';
  cargando: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {

    if (!this.email || !this.password) {
      this.error = 'Ingresa tu email y contraseña';
      return;
    }

    this.cargando = true;
    this.error = '';


    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.error = 'Credenciales incorrectas. Verifica tu email y contraseña.';
        this.cargando = false;
      }
    });
  }
}
