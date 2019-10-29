import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableService } from './table.service';
import { Employee, EmployeeResp } from '../../core/models/employee.model';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';
import { DEPARTMENTS_NAME } from '../../core/store/reducers/departments.reducer';
import { Department, DepartmentResp } from '../../core/models/department.model';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService]
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  public searchParams = {
    limit: 4,
    pageNumber: 0,
    query: ''
  };
  private url = '/table';
  public employees: Employee[] = [];
  public departments: Department[] = [];
  private objectKeys = Object.keys;
  public employeesCount = 0;
  public confirmDelete: Employee;
  public pageSizeOptions = [4, 8, 12, 20];
  public isSearching = false;
  public displayedColumns = ['id', 'name', 'active', 'department', 'delete'];
  constructor(
    private tableService: TableService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<any>) {
}

  ngOnInit() {
    this.objectKeys(this.searchParams).forEach(key => {
      this.checkUrl(key);
    });
    this.paginator.pageIndex = this.searchParams.pageNumber;
    this.paginator.pageSize = this.searchParams.limit;
    this.store.select(DEPARTMENTS_NAME).subscribe((resp: DepartmentResp) => {
      this.departments = resp.results || [];
    });
    this.loadData();
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , filter(res => res.length > 1)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.loadData(this.searchParams.limit, 0, text);
    });
  }

  checkUrl(key) {
    const urlKey = this.activatedRoute.snapshot.paramMap.get(key);
    this.searchParams[key] = urlKey || this.searchParams[key];
  }

  loadData(size?: number, index?: number, query?: string) {
    this.searchParams = {
      limit:  size || this.searchParams.limit,
      pageNumber: (index >= 0) ? index : this.searchParams.pageNumber,
      query: query || this.searchParams.query
    };
    const url = this.router.createUrlTree([this.url, this.searchParams]).toString();
    this.location.go(url);
    this.tableService.getList(this.searchParams).subscribe( (res: EmployeeResp) => {
      this.employees = res.results;
      this.employeesCount = res.count;
    });
  }

  deleteEmployee(employee: Employee) {
    this.tableService.deleteEmployee(employee.id).subscribe( () => {
      this.loadData();
    });
  }

  changeConfirmDelete(employee: Employee) {
    this.confirmDelete = (employee === this.confirmDelete) ? undefined : employee;
  }
}
