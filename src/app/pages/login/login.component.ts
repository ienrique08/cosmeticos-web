import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  iniciarSesion() {
   this.auth.login({ usuario: this.usuario, password: this.password })
.subscribe({
      next: (res: any) => {
        this.auth.guardarToken(res.token);
        this.router.navigate(['admin/agregar-producto']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.error = 'Credenciales incorrectas';
      },
    });
  }
}
