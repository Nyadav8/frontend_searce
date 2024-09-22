import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProjectdetailsService {
  constructor(public http: HttpClient) {}

  public getDetails(body: any, id: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/projectWorkforceRoute/list/${id}`,
      body,
      {
        headers: {
          userData: localStorage.getItem('user') || '',
        },
      }
    );
  }
  public createDetails(body: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/projectWorkforceRoute/create`,
      body,
      {
        headers: {
          userData: localStorage.getItem('user') || '',
        },
      }
    );
  }
  public editBudget(body: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/project/editBudget`,
      body,
      {
        headers: {
          userData: localStorage.getItem('user') || '',
        },
      }
    );
  }
}
