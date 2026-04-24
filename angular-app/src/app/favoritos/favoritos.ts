import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { FavoritosService } from '../servicios/favoritos.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})

export class Favoritos {

  favoritos: any[] = [];

  constructor(
    private favoritosService: FavoritosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.favoritos = this.favoritosService.obtenerFavoritos();
  }

  eliminar(nombre: string) {
    this.favoritosService.eliminarFavorito(nombre);
    this.favoritos = this.favoritosService.obtenerFavoritos();
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle', id]);
  }
}