import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { DateTimeFormatPipePipe } from './helpers/DateTimeFormatPipe.pipe';

@NgModule({
   declarations: [
      AppComponent,
      UsuariosComponent,
      DateTimeFormatPipePipe
   ],
   imports: [
      BrowserModule,
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
