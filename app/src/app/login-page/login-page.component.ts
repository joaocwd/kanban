import { Component } from '@angular/core';
import { LoginPageService } from './login-page.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  register = false
  forgot = false
  loginError = false

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private loginService: LoginPageService,
    private router: Router
  ) { }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      this.loginService.login(email, password).subscribe(
        (dados: any) => {
          console.log(dados)
          this.saveCredentials(dados)
        },
        error => {
          console.log('error', error)
          this.loginError = true
        }
      )
    } else {
      this.loginError = true
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.repeatPassword) {
        this.loginService.register(
          this.registerForm.value.fullName,
          this.registerForm.value.email,
          this.registerForm.value.password,
        ).subscribe(
          (data: any) => {
            console.log(data)
            this.saveCredentials(data)
          },
          error => {
            console.log('error registar()', error)
          }
        )
      }
    }
  }

  saveCredentials(dados: any): void {
    localStorage.setItem('token', `Bearer ${dados.token.trim()}`)
    this.router.navigate(['/'])
  }

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
