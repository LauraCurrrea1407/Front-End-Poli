import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FavoritosService } from '../servicios/favoritos.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './servicios.html'
})
export class Servicios {

  constructor(
    private favoritosService: FavoritosService,
    private router: Router
  ) {}

  @Input() mostrarBuscador: boolean = true;

  busqueda: string = "";
  servicios: any[] = [];

  ngOnInit() {

    const datos = localStorage.getItem('servicios');

    const serviciosBase = [
      {
        id: 1,
        nombre: "Reparación de celulares",
        descripcion: "Diagnóstico y reparación de smartphones.",
        img: "assets/img/celulares.jpg"
      },
      {
        id: 2,
        nombre: "Reparación de laptops",
        descripcion: "Mantenimiento y cambio de piezas.",
        img: "assets/img/laptops.jpg"
      },
      {
        id: 3,
        nombre: "Reparación de consolas",
        descripcion: "Servicio técnico para videojuegos.",
        img: "assets/img/consolas.jpg"
      }
    ];

    if (!datos) {
      this.servicios = serviciosBase;
      localStorage.setItem('servicios', JSON.stringify(serviciosBase));
    } else {
      const serviciosGuardados = JSON.parse(datos);

      if (serviciosGuardados.length === 0) {
        this.servicios = serviciosBase;
        localStorage.setItem('servicios', JSON.stringify(serviciosBase));
      } else {
        this.servicios = serviciosGuardados;
      }
    }
  }

  get serviciosFiltrados() {
    return this.servicios.filter(s =>
      s.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  guardarFavorito(servicio: any) {
    this.favoritosService.agregarFavorito(servicio);
      alert('✅ Servicio agregado a favoritos');

  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle', id]);
  }

  solicitarServicio(servicio: any) {
    localStorage.setItem('servicioSeleccionado', JSON.stringify(servicio));
    this.router.navigate(['/mis-solicitudes']);
  }
}