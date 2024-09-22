// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(public http: HttpClient) {}
  public getAllProjects(body: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/project/getProjectList',
      body,
      {
        headers: {
          userData: localStorage.getItem('user') || '',
        },
      }
    );
  }
  public createProject(body: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/project/create', body, {
      headers: {
        userData: localStorage.getItem('user') || '',
      },
    });
  }
}
