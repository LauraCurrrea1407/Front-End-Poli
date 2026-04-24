import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  img?: string;
}

interface Solicitud {
  id: number;
  servicio: string;
  detalles: string;
  datosExtra: string;
  fecha: string;
  hora: string;
  estado: string;
}

@Component({
  selector: 'app-mis-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-solicitudes.html',
  styleUrl: './mis-solicitudes.css'
})
export class MisSolicitudes {

  mostrarModal = false;
  editId: number | null = null;

  filtroEstado = "Todos";

  servicios: Servicio[] = [];
  solicitudes: Solicitud[] = [];

  horasDisponibles = [
    "09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00"
  ];

  form: Solicitud = {
    id: 0,
    servicio: '',
    detalles: '',
    datosExtra: '',
    fecha: '',
    hora: '',
    estado: 'Pendiente'
  };

  constructor() {
    this.cargarServicios();
    this.cargarSolicitudes();
  }

  // ================= MODAL =================
  abrirModal() {
    this.mostrarModal = true;
    this.editId = null;

    this.form = {
      id: 0,
      servicio: '',
      detalles: '',
      datosExtra: '',
      fecha: '',
      hora: '',
      estado: 'Pendiente'
    };
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  // ================= SERVICIOS =================
  cargarServicios() {
    const data = localStorage.getItem('servicios');
    this.servicios = data ? JSON.parse(data) : [];
  }

  // ================= SOLICITUDES =================
  cargarSolicitudes() {
    const data = localStorage.getItem('solicitudes');
    this.solicitudes = data ? JSON.parse(data) : [];
  }

  cargarHoras(fecha: string) {
  if (!fecha) {
    this.horasDisponibles = [
      "09:00","10:00","11:00","12:00",
      "13:00","14:00","15:00","16:00"
    ];
    return;
  }

  this.horasDisponibles = [
    "09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00"
  ];
}

  guardar() {

    if (this.editId !== null) {
      this.solicitudes = this.solicitudes.map(s =>
        s.id === this.editId ? { ...this.form, id: this.editId } : s
      );
    } else {
      this.solicitudes.push({
        ...this.form,
        id: Date.now()
      });
    }

    localStorage.setItem('solicitudes', JSON.stringify(this.solicitudes));
    this.cerrarModal();
  }

  editar(s: Solicitud) {
    this.editId = s.id;
    this.form = { ...s };
    this.mostrarModal = true;
  }

  cancelar(id: number) {
    this.solicitudes = this.solicitudes.map(s =>
      s.id === id ? { ...s, estado: 'Cancelada' } : s
    );

    localStorage.setItem('solicitudes', JSON.stringify(this.solicitudes));
  }

  // ================= FILTRO =================
  get solicitudesFiltradas() {

    if (this.filtroEstado === "Todos") {
      return this.solicitudes;
    }

    return this.solicitudes.filter(s =>
      s.estado === this.filtroEstado
    );
  }

  // ================= ESTADÍSTICAS =================
  get totalPendiente() {
    return this.solicitudes.filter(s => s.estado === 'Pendiente').length;
  }

  get totalProgreso() {
    return this.solicitudes.filter(s => s.estado === 'En Progreso').length;
  }

  get totalCompletadas() {
    return this.solicitudes.filter(s => s.estado === 'Solucionada').length;
  }

  get totalCanceladas() {
    return this.solicitudes.filter(s => s.estado === 'Cancelada').length;
  }


  getEstadoClase(estado: string): string {

  switch (estado) {
    case 'Pendiente':
      return 'bg-warning text-dark';

    case 'En Progreso':
      return 'bg-primary';

    case 'Solucionada':
      return 'bg-success';

    case 'Cancelada':
      return 'bg-danger';

    case 'Editada':
      return 'bg-secondary';

    default:
      return 'bg-dark';
  }
}
}