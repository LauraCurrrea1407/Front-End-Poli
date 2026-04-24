import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private key = 'favoritos';

  // ✅ OBTENER FAVORITOS
  obtenerFavoritos() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  // ✅ AGREGAR FAVORITO
  agregarFavorito(servicio: any) {

    const favoritos = this.obtenerFavoritos();

    // evitar duplicados
    const existe = favoritos.find((f: any) => f.nombre === servicio.nombre);

    if (!existe) {
      favoritos.push(servicio);
      localStorage.setItem(this.key, JSON.stringify(favoritos));
    }
  }

  // ✅ ELIMINAR FAVORITO
  eliminarFavorito(nombre: string) {
    let favoritos = this.obtenerFavoritos();

    favoritos = favoritos.filter((f: any) => f.nombre !== nombre);

    localStorage.setItem(this.key, JSON.stringify(favoritos));
  }
}