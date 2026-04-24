import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Servicios } from '../servicios/servicios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Servicios, RouterLink], 
  templateUrl: './home.html'
})
export class Home {

  constructor(private router: Router) {}

  solicitarServicio(servicio: any) {
    localStorage.setItem('servicioSeleccionado', JSON.stringify(servicio));
    this.router.navigate(['/mis-solicitudes']);
  }

}