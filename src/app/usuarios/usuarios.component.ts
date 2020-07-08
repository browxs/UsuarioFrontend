import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';
import { Usuario } from '../_models/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  _filtroNome: string = '';
  get filtroNome(): string {
    return this._filtroNome;
  }
  set filtroNome(value: string){
    this._filtroNome = value;
    this.usuariosFiltrados = this.filtroNome ? this.filtrarUsuarios(this.filtroNome) : this.usuarios;
  }

  usuariosFiltrados: Usuario[];
  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  filtrarUsuarios(filtrarPor: string): Usuario[] {
    filtrarPor = filtrarPor.toLocaleUpperCase();
    return this.usuarios.filter(
      usuario => usuario.nome.toLocaleUpperCase().indexOf(filtrarPor) !== -1
    );
  }

  getUsuarios() {
    this.usuarioService.getUsuario().subscribe(
      (_usuarios: Usuario[]) => { 
      this.usuarios = _usuarios; 
      this.usuariosFiltrados = this.usuarios;
      console.log(_usuarios);
    }, error => {
      console.log(error);
    });
  }

}
