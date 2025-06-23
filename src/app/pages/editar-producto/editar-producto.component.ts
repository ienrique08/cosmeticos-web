import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {
  productoForm!: FormGroup;
  productoId!: number;
  productoActual!: Producto;
  imagenSeleccionada!: File;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));

    this.productosService.obtenerProductoPorId(this.productoId).subscribe((producto) => {
      this.productoActual = producto;
      this.productoForm = this.fb.group({
        nombre: [producto.nombre],
        descripcion: [producto.descripcion],
        precio: [producto.precio]
      });
    });
  }

  onFileSelected(event: any): void {
    this.imagenSeleccionada = event.target.files[0];
  }

  editarProducto(): void {
    const formData = new FormData();
    formData.append('nombre', this.productoForm.get('nombre')?.value);
    formData.append('descripcion', this.productoForm.get('descripcion')?.value);
    formData.append('precio', this.productoForm.get('precio')?.value);

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.productosService.editarProducto(this.productoId, formData).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }
}
