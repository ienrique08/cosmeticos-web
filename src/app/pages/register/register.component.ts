import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario = '';
  password = '';
  mensaje = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  registrar() {
    this.auth.register({ usuario: this.usuario, password: this.password }).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado correctamente';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al registrar';
      }
    });
  }
}
