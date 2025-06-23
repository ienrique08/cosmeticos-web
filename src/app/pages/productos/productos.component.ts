import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})


export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService, public auth: AuthService, private carritoService: CarritoService
) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

 cargarProductos(): void {
  this.productosService.obtenerProductos().subscribe({
    next: (data) => {
      // Agrega la propiedad cantidadSeleccionada a cada producto
      this.productos = data.map(producto => ({
        ...producto,
        cantidadSeleccionada: 1
      }));
    },
    error: (err) => {
      console.error('Error al cargar productos', err);
    }
  });
}
  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe(() => {
        this.cargarProductos(); // vuelve a cargar la lista
      });
    }
  }
agregarAlCarrito(producto: Producto, cantidad: number = 1) {
  for (let i = 0; i < cantidad; i++) {
    this.carritoService.agregar(producto);
  }
}
}
