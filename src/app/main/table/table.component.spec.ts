import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormComponent } from './table-form/table-form.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../core/pipes/pipes.module';
import { PermissionGuard } from '../../core/auth/guards';
import { TableService } from './table.service';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { departmentRespFactory } from '../../core/models/department.model';
import { employeeFactory, employeeRespFactory } from '../../core/models/employee.model';


describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: new Map<string, string>([
        ['id', '11'],
        ['query', 'test']
      ]),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TableFormComponent,
        TableComponent
      ],
      imports: [
        CommonModule,
        TableRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: 'table', component: TableComponent
          }
        ]),
        BrowserAnimationsModule,
        MaterialModule,
        PipesModule,
      ],
      providers: [
        PermissionGuard,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: TableService,
          useValue: {
            getEmployee: jest.fn().mockReturnValue(of({})),
            createEmployee: jest.fn().mockReturnValue(of({})),
            updateEmployee: jest.fn().mockReturnValue(of({}))
          }
        },
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            select: jest.fn().mockReturnValue(of()),
            pipe: jest.fn().mockReturnValue(of()),
          }
        }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize', () => {
    const departments = departmentRespFactory();
    component['store'].select = jest.fn().mockReturnValue(of(departments));
    component.ngOnInit();
    expect(component.departments).toEqual(departments.results);
  });

  test('should set searchParams', () => {
    component.checkUrl('query');
    expect(component.searchParams['query']).toEqual('test');
  });

  test('should set searchParams', () => {
    component.checkUrl('query');
    expect(component.searchParams['query']).toEqual('test');
  });

  test('should load employees', () => {
    const response = employeeRespFactory();
    component['tableService'].getList = jest.fn().mockReturnValue(of(response));
    component.loadData();
    expect(component.employees).toEqual(response.results);
  });

  test('should delete employee', () => {
    const employee = employeeFactory(0);
    component['tableService'].deleteEmployee = jest.fn().mockReturnValue(of({}));
    const spy = jest.spyOn(component, 'loadData');
    component.deleteEmployee(employee);
    expect(spy).toHaveBeenCalled();
  });

  test('should set change confirm to delete item', () => {
    const employee = employeeFactory(0);
    component.changeConfirmDelete(employee);
    expect(component.confirmDelete).toEqual(employee);
  });
});
