import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html'
})
export class App {

  // 👇 CONTROL DEL MENÚ RESPONSIVE
  menuAbierto = false;

  // 👇 OPCIONAL: cerrar menú al hacer click
  cerrarMenu() {
    this.menuAbierto = false;
  }

}