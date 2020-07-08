import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario' ;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = 'https://localhost:44373/api/usuarios';

  constructor(private http: HttpClient) { }

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  getUsuarioById(id: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/${id}`);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post(this.baseUrl, usuario);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(`${this.baseUrl}/${usuario.id}`, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
