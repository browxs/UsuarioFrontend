import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.http.get('https://localhost:44373/api/usuarios').subscribe(response => { 
      this.usuarios = response; 
    }, error => {
      console.log(error);
    });
  }

}
