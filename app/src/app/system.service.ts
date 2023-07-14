import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private api = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  getUserData(token: string) {
    return this.http.get(`${this.api}/users/`, {
      headers: {
        "Authorization": token
      }
    })
  }
}
