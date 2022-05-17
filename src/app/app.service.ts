import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getProperties() {
    const token = localStorage.getItem('token');
    return this.http.get(`${environment.backenduri}/property/list`, {
      params: {
        'order[id]': 'asc',
        'where[status][value]': 'draft',
        'where[status][relation]': 'Equal',
        page: '1',
        limit: '10',
        count: 'true',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getCSRF() {
    return this.http.get(`${environment.backenduri}`, {
      withCredentials: true,
    });
  }
}
