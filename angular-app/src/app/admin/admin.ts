import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html'
})
export class Admin {

  servicios: any[] = [];

  form = {
    nombre: '',
    descripcion: '',
    img: ''
  };

  editIndex: number | null = null;

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    const data = localStorage.getItem('servicios');
    this.servicios = data ? JSON.parse(data) : [];
  }

  guardarServicio() {

    if (!this.form.nombre || !this.form.descripcion || !this.form.img) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (this.editIndex === null) {
      this.servicios.push({
        id: Date.now(),
        ...this.form
      });
    } else {
      this.servicios[this.editIndex] = {
        ...this.servicios[this.editIndex],
        ...this.form
      };
    }

    localStorage.setItem('servicios', JSON.stringify(this.servicios));

    this.limpiarForm();
    this.cargarServicios();
  }

  editar(index: number) {
    const s = this.servicios[index];

    this.form = {
      nombre: s.nombre,
      descripcion: s.descripcion,
      img: s.img
    };

    this.editIndex = index;
  }

  eliminar(index: number) {
    if (confirm("¿Eliminar servicio?")) {
      this.servicios.splice(index, 1);
      localStorage.setItem('servicios', JSON.stringify(this.servicios));
      this.cargarServicios();
    }
  }

  limpiarForm() {
    this.form = {
      nombre: '',
      descripcion: '',
      img: ''
    };
    this.editIndex = null;
  }
}