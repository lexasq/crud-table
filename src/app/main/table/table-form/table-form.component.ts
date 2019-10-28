import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Employee } from '../../../core/models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DEPARTMENTS_NAME } from '../../../core/store/reducers/departments.reducer';
import { Department, DepartmentResp } from '../../../core/models/department.model';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss'],
})
export class TableFormComponent implements OnInit {
  public employee: Employee = {
    name: '',
    active: false,
    department: undefined
  };
  public departments: Department[];
  private employeeForm: FormGroup;
  constructor(
    private tableService: TableService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<any>
  ) {
    const checkId = this.activatedRoute.snapshot.paramMap.get('id');
    if (checkId) {
      this.employee.id = +checkId;
    }
  }

  ngOnInit() {
    this.buildForm();
    this.store.select(DEPARTMENTS_NAME).subscribe((resp: DepartmentResp) => {
      this.departments = JSON.parse(JSON.stringify(resp.results || []));
    });
    if (this.employee.id) {
      this.tableService.getEmployee(this.employee.id).subscribe((res: Employee) => {
        this.employee = res;
        this.buildForm();
      }, err => {

        this.router.navigateByUrl('/table');
        this.snackBar.open(err.error.message, 'Error!');
      });
    }
  }

  buildForm() {
    this.employeeForm = this.formBuilder.group({
      name: [this.employee.name, Validators.required],
      active: [this.employee.active, Validators.required],
      department: [this.employee.department, Validators.required]
    });
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      Object.assign(this.employee, this.employeeForm.value);
      if (this.employee.id) {
        this.tableService.updateEmployee(this.employee).subscribe(() => {
          this.snackBar.open('Employee info was updated', 'Success!');
          this.router.navigateByUrl('/table');
        }, () => {
          this.snackBar.open('Something went wrong', 'Error!');
        });
      } else {
          this.tableService.createEmployee(this.employee).subscribe(() => {
            this.router.navigateByUrl('/table');
          }, () => {
            this.snackBar.open('Something went wrong', 'Error!');
          });
      }
    }
  }

  get f() {
    return this.employeeForm.controls;
  }
}
