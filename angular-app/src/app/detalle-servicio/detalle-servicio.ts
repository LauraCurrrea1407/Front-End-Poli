import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-servicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-servicio.html'
})
export class DetalleServicio {

  servicio: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const servicios = JSON.parse(localStorage.getItem('servicios') || '[]');

    this.servicio = servicios.find((s: any) => s.id === id);
  }
}