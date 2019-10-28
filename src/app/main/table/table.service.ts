import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../core/models/employee.model';


@Injectable()
export class TableService {

  constructor(private http: HttpClient) {
  }

  getList(params): Observable<object> {
    return this.http.get('/api/employees', {params});
  }

  deleteEmployee(id: number): Observable<object> {
    return this.http.delete(`/api/employees/${id}`);
  }

  getEmployee(id: number): Observable<object> {
    return this.http.get(`/api/employees/${id}`);
  }

  updateEmployee(body: Employee): Observable<object> {
    return this.http.put(`/api/employees/${body.id}`, body);
  }

  createEmployee(body: Employee): Observable<object> {
    return this.http.post(`/api/employees`, body);
  }
}
