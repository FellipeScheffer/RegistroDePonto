import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // para usar ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // importa módulos necessários
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('E-mail:', this.email);
    console.log('Senha:', this.password);
    alert(`Login com: ${this.email}`);
  }
}
