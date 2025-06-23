import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductosComponent } from "./pages/productos/productos.component";
import { LoginComponent } from "./pages/login/login.component";
import { AgregarProductoComponent } from "./pages/agregar-producto/agregar-producto.component";
import { AuthGuard } from "./guards/auth.guard";
import { EditarProductoComponent } from "./pages/editar-producto/editar-producto.component";

// src/app/app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin/agregar-producto',
    component: AgregarProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/editar-producto/:id',
    component: EditarProductoComponent,
    canActivate: [AuthGuard],
  },
];
