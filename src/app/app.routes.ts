import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'quienes-somos', component: QuienesSomosComponent},
  { path: 'contacto', component: ContactoComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'admin/agregar-producto', component: AgregarProductoComponent },
  { path: 'editar-producto/:id', component: EditarProductoComponent },
  { path: 'login', component: LoginComponent },
{path: 'carrito', component: CarritoComponent},
 { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },


  { path: '**', redirectTo: '' }
];
// El orden de las rutas es importante, la ruta '**' debe ir al final
// para que no atrape todas las rutas.
