import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  nombre: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.url}/login`, request).pipe(
      tap(response => {
        // Guardamos todo en localStorage para que persista
        // aunque el usuario cierre y vuelva a abrir el navegador
        localStorage.setItem('token', response.token);
        localStorage.setItem('nombre', response.nombre);
        localStorage.setItem('email', response.email);
        localStorage.setItem('rol', response.rol);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  getNombre(): string | null { return localStorage.getItem('nombre');}
  getEmail(): string | null { return localStorage.getItem('email');}
  getRol(): string | null { return localStorage.getItem('rol');}

  isLoggedIn(): boolean { return this.getToken() !== null;}
}
