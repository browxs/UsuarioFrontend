import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/Usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  usuariosFiltrados: Usuario[];
  usuarios: Usuario[];
  modalRef: BsModalRef;

  _filtroNome = '';

  constructor(
    private usuarioService: UsuarioService,
    private modalService: BsModalService
  ) { }
  
  get filtroNome(): string {
    return this._filtroNome;
  }
  set filtroNome(value: string){
    this._filtroNome = value;
    this.usuariosFiltrados = this.filtroNome ? this.filtrarUsuarios(this.filtroNome) : this.usuarios;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

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
