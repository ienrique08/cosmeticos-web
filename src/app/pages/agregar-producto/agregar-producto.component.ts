import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  productoForm: FormGroup;
  imagenSeleccionada: File | null = null;

  constructor(private fb: FormBuilder, private productosService: ProductosService) {
    this.productoForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      precio: ['']
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.imagenSeleccionada = file || null;
  }

  agregarProducto() {
    if (!this.imagenSeleccionada) return;

    const formData = new FormData();
    formData.append('nombre', this.productoForm.value.nombre);
    formData.append('descripcion', this.productoForm.value.descripcion);
    formData.append('precio', this.productoForm.value.precio);
    formData.append('imagen', this.imagenSeleccionada);

    this.productosService.agregarProducto(formData).subscribe(res => {
      console.log('Producto agregado', res);
    });
  }
}
