import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Servicio {
  id?: number;
  titulo: string;
  descripcion?: string;
  icono?: string;
  orden?: number;
  activo?: boolean;
}

export interface Articulo {
  id?: number;
  titulo: string;
  resumen?: string;
  contenido?: string;
  imagenUrl?: string;
  publicado?: boolean;
  fechaPublicacion?: string;
  createdAt?: string;
  autor?: {
    id: number;
    nombre: string;
    emial: string;
  };
}

export interface MensajeContacto {
  id?: number;
  nombre: string;
  email: string;
  telefono?: string;
  asunto?: string;
  mensaje: string;
  leido?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  private urlPublic = `${environment.apiUrl}/public`;
  private urlAdmin = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  //---Rutas públicas---
  getServiciosPublicos(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.urlPublic}/servicios`);
  }

  getArticulosPublicados(): Observable<Servicio[]> {
    return this.http.get<Articulo[]>(`${this.urlPublic}/articulos`);
  }

  getArticuloPublico(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.urlPublic}/articulos/${id}`);
  }

  enviarMensaje(mensaje: MensajeContacto): Observable<any> {
    return this.http.post(`${this.urlPublic}/contacto`, mensaje);
  }

  //--- Rutas admin (JWT via interceptor) ---
  getServiciosAdmin(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.urlAdmin}/servicios`);
  }

  crearServicio(s: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.urlAdmin}/servicios`, s);
  }

  actualizarServicio(id: number, s: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.urlAdmin}/servicios/${id}`, s);
  }

  toggleServicio(id: number): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.urlAdmin}/servicios/${id}/toggle`, {});
  }

  eliminarServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlAdmin}/servicios/${id}`);
  }

  getArticulosAdmin(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.urlAdmin}/articulos`);
  }

  crearArticulo(a: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(`${this.urlAdmin}/articulos`, a);
  }

  actualizarArticulo(id: number, a: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.urlAdmin}/articulos/${id}`, a);
  }

  toggleArticulo(id: number): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.urlAdmin}/articulos/${id}/toggle`, {});
  }

    eliminarArticulo(id: number): Observable<void> {
      return this.http.delete<void>(`${this.urlAdmin}/articulos/${id}`);
    }

    getMensajesAdmin(): Observable<MensajeContacto[]> {
      return this.http.get<MensajeContacto[]>(`${this.urlAdmin}/mensajes`);
    }

    getMensajesNoLeidos(): Observable<{ noLeidos: number }> {
      return this.http.get<{ noLeidos: number }>(
        `${this.urlAdmin}/mensajes/no-leidos`);
    }

    toggleMensaje(id: number): Observable<MensajeContacto> {
      return this.http.put<MensajeContacto>(`${this.urlAdmin}/mensajes/${id}/toggle`, {});
    }

    eliminarMensaje(id: number): Observable<void> {
      return this.http.delete<void>(`${this.urlAdmin}/mensajes/${id}`);
    }
}
