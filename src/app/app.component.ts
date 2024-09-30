import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loginSuccess = false;

  form = {
    email: '',
    password: '',
  };

  onSubmit(): void {
    if (this.form.email && this.form.password) {
      this.loginSuccess = true;
    } else {
      this.loginSuccess = false;
    }

  }
}
