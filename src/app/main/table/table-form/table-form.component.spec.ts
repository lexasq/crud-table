import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormComponent } from './table-form.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { PermissionGuard } from '../../../core/auth/guards';
import { TableService } from '../table.service';
import { TableRoutingModule } from '../table-routing.module';
import { TableComponent } from '../table.component';
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {Store} from "@ngrx/store";
import {of} from "rxjs/internal/observable/of";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {departmentRespFactory} from "../../../core/models/department.model";


describe('TableFormComponent', () => {
  let component: TableFormComponent;
  let fixture: ComponentFixture<TableFormComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: new Map<string, string>([[
        'id', '11'
      ]]),
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
    fixture = TestBed.createComponent(TableFormComponent);
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

  test('should initialize', () => {
    const spy = jest.spyOn(component['tableService'], 'getEmployee');
    component.employee.id = 1;
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  describe('on submit tests', () => {
    test('should emit createEmployee on submit form', () => {
      const spy = jest.spyOn(component['tableService'], 'createEmployee');
      component['employeeForm'].setValue({
        name: 'testName',
        active: true,
        department: 1
      });
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
    });

    test('should emit updateEmployee on submit form', () => {
      const spy = jest.spyOn(component['tableService'], 'updateEmployee');
      component['employeeForm'].setValue({
        name: 'testName',
        active: true,
        department: 1
      });
      component.employee.id = 11;
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
    });
  });
});
