import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  constructor(private http: HttpClient) {}
  login() {
    return this.http.post(
      `${environment.backenduri}/auth/login`,
      {
        email: 'shubham.soni@mtxb2b.com',
        password: 'Pass@123',
      },
      {
        withCredentials: true,
      }
    );
  }
}
