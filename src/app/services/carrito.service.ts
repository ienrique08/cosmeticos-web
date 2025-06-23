import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: ItemCarrito[] = [];

  agregar(producto: Producto) {
    const encontrado = this.items.find(i => i.producto.id === producto.id);
    if (encontrado) {
      encontrado.cantidad++;
    } else {
      this.items.push({ producto, cantidad: 1 });
    }
  }

  obtenerItems(): ItemCarrito[] {
    return this.items;
  }

  limpiar() {
    this.items = [];
  }

  obtenerTotal(): number {
    return this.items.reduce((acc, item) => acc + Number(item.producto.precio) * item.cantidad, 0);
  }
}
