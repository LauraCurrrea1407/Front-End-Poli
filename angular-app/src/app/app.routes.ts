import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Servicios } from './servicios/servicios';
import { MisSolicitudes } from './mis-solicitudes/mis-solicitudes';
import { Favoritos } from './favoritos/favoritos'; 
import { Contacto } from './contacto/contacto';
import { Admin } from './admin/admin';
import { DetalleServicio } from './detalle-servicio/detalle-servicio';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'servicios', component: Servicios },
  { path: 'mis-solicitudes', component: MisSolicitudes },
  { path: 'favoritos', component: Favoritos }, 
  { path: 'contacto', component: Contacto },
  { path: 'admin', component: Admin },
  { path: 'detalle/:id', component: DetalleServicio }
];