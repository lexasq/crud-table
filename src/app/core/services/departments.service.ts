import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DepartmentsService {

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<object> {
    return this.http.get('/api/departments');
  }
}
