import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {

  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  enviarFormulario() {

    // VALIDACIÓN
    if (!this.nombre || !this.correo || !this.mensaje) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // MENSAJE DE CONFIRMACIÓN
    alert('Mensaje enviado correctamente ✅');

    // LIMPIAR FORMULARIO
    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }
}