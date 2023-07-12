import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  register = false
  forgot = false
  
  registrar() {
    this.register = true
    this.forgot = false
  }

  esqueci() {
    this.forgot = true
    this.register = false
  }

  sendEmail() {
    this.register = false
    this.forgot = false
  }
}
