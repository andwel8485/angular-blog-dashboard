import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /**
   *
   */
  constructor(private authService: AuthService) {}

  onSubmit(credential: { email: string; password: string }) {
    console.log(credential);
    this.authService.login(credential.email, credential.password);
  }
}
