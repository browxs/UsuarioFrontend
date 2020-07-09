import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/Usuario';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  usuariosFiltrados: Usuario[];
  usuarios: Usuario[];
  usuario: Usuario;
  registerForm: FormGroup;
  bodyExcluirUsuario = '';
  dataNascimento: Date;
  modoSalvar = 'post';

  _filtroNome = '';
  
  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
    ) {  
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
  }
    
  ngOnInit() {
    this.validation();
    this.getUsuarios();
  }

  maxDateValidation(date : Date) : ValidatorFn {
    return (control: AbstractControl) : {[key : string]: any} | null => {
      const forbidden = new Date(control.value) > date;
      return forbidden ? {maxDateValidation: {value: control.value}}
      : null;
    };
  }
  
  validation() {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, this.maxDateValidation(new Date())]],
      escolaridade: ['', [Validators.required, Validators.min(0), Validators.max(3)]]
    });
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

  get filtroNome(): string {
    return this._filtroNome;
  }

  set filtroNome(value: string){
    this._filtroNome = value;
    this.usuariosFiltrados = this.filtroNome ? this.filtrarUsuarios(this.filtroNome) : this.usuarios;
  }

  filtrarUsuarios(filtrarPor: string): Usuario[] {
    filtrarPor = filtrarPor.toLocaleUpperCase();
    return this.usuarios.filter(
      usuario => usuario.nome.toLocaleUpperCase().indexOf(filtrarPor) !== -1
    );
  }

  openModal(template: any){
    this.registerForm.reset();
    template.show();
  }
    
  novoUsuario(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  editarUsuario(usuario: Usuario, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.usuario = usuario;
    this.registerForm.patchValue(usuario);
  }  

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post'){
        this.usuario = Object.assign({}, this.registerForm.value);
        this.usuarioService.postUsuario(this.usuario).subscribe(
          (novoUsuario: Usuario) => {
            template.hide();
            this.getUsuarios();
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.usuario = Object.assign({id: this.usuario.id}, this.registerForm.value);
        this.usuarioService.putUsuario(this.usuario).subscribe(
          () => {
            template.hide();
            this.getUsuarios();
          }, error => {
            console.log(error);
          }
        );
      }      
    }
  }  

  excluirUsuario(usuario: Usuario, template: any) {
    this.openModal(template);
    this.usuario = usuario;
    this.bodyExcluirUsuario = `Tem certeza que deseja excluir o usuário: ${usuario.nome} ${usuario.sobrenome}`;
  }
  
  confirmDelete(template: any) {
    this.usuarioService.deleteUsuario(this.usuario.id).subscribe(
      () => {
          template.hide();
          this.getUsuarios();
        }, error => {
          console.log(error);
        }
    );
  }
  
}