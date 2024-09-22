import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public http: HttpClient) {}

  public getLogin(body: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/users/login', body);
  }
}
