import { TestBed } from '@angular/core/testing';
import { TableService } from './table.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('TableService', () => {
  let service: TableService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        TableService
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    service = TestBed.get(TableService);
  });

  test('should get employees ', () => {
    const params = {
      limit: 4,
      pageNumber: 0,
      query: ''
    };
    const spy = jest.spyOn(service['http'], 'get');
    service.getList(params);
    expect(spy).toHaveBeenCalledWith( '/api/employees', { params });
  });

  test('should delete employee by id ', () => {
    const spy = jest.spyOn(service['http'], 'delete');
    service.deleteEmployee(1);
    expect(spy).toHaveBeenCalledWith( '/api/employees/1');
  });

  test('should get employee by id ', () => {
    const spy = jest.spyOn(service['http'], 'get');
    service.getEmployee(1);
    expect(spy).toHaveBeenCalledWith( '/api/employees/1');
  });

  test('should update employee ', () => {
    const params = {
      id: 1,
      name: 'test',
      active: true,
      department: 1
    };
    const spy = jest.spyOn(service['http'], 'put');
    service.updateEmployee(params);
    expect(spy).toHaveBeenCalledWith( '/api/employees/1', params );
  });

  test('should create employee ', () => {
    const params = {
      name: 'test',
      active: true,
      department: 1
    };
    const spy = jest.spyOn(service['http'], 'post');
    service.createEmployee(params);
    expect(spy).toHaveBeenCalledWith( '/api/employees', params );
  });
});
