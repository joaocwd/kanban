import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  private api = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/users`, {email, password})
  }

  register(fullName: string, email: string, password: string) {
    return this.http.post(`${this.api}/users/register`, {
      fullName,
      email,
      password
    })
  }
}
