import { Injectable } from '@angular/core';
import { HttpRequest,
         HttpResponse,
         HttpHandler,
         HttpEvent,
         HttpInterceptor,
         HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { EMPLOYEES } from './fixtures/employees.fixture';
import { DEPARTMENTS } from './fixtures/departments.fixture';
// array for registered users
const USERS = [{
    id: 1,
    username: 'admin',
    firstName: 'Alex',
    lastName: 'Admin',
    password: 'test',
    permission: 'admin',
    token: 'admin'
  }, {
    id: 2,
    username: 'basic',
    firstName: 'Alex',
    lastName: 'Basic',
    password: 'test',
    permission: 'basic',
    token: 'basic'
  }
];
let employeesList = EMPLOYEES;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    const token: string = localStorage.getItem('jwtToken');
    request = request.clone({ headers: request.headers.set('Authorization', `JWT ${token}`)});
    const { url, method, headers, body } = request;
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
    function handleRoute() {
      switch (true) {
        case url.endsWith('api/obtain_token') && method === 'POST':
          return authenticate();
        case url.match(/\/api\/employees\/\d+$/) && method === 'GET':
          return getEmployeeById();
        case url.match(/\/api\/employees\/\d+$/) && method === 'PUT':
          return updateEmployee();
        case (url.indexOf('api/employees') > -1) && (method === 'POST') :
          return createEmployee();
        case (url.indexOf('api/employees') > -1) && (method === 'GET'):
          return getEmployees();
        case url.match(/\/api\/employees\/\d+$/) && method === 'DELETE':
          return deleteUser();
        case (url.indexOf('api/departments') > -1) && (method === 'GET'):
          return getDepartments();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user = USERS.find(x => x.username === username && x.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        permission: user.permission,
        token: user.token
      });
    }

    function getEmployeeById() {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      const employee = employeesList.find(x => x.id === idFromUrl());
      if (!employee) {
        return error('Employee Id not found');
      }
      return ok(employee);
    }

    function updateEmployee() {
      const { name, active, department } = body;
      const employeeIndex = employeesList.findIndex(x => x.id === idFromUrl());
      Object.assign(employeesList[employeeIndex], {name, active, department});
      return ok(employeesList[employeeIndex]);
    }

    function createEmployee() {
      const { name, active, department } = body;
      const employee = {
        id: employeesList[employeesList.length - 1].id + 1,
        name,
        active,
        department
      };
      employeesList.push(employee);
      return ok(employee);
    }

    function getEmployees() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const limit = +request.params.get('limit');
      const pageNumber = +request.params.get('pageNumber');
      const query = request.params.get('query');
      const employees = {
        results: employeesList
          .filter(employee => employee.name.startsWith(query))
          .slice(pageNumber * limit, pageNumber * limit + +limit),
        count: employeesList.length
      };
      return ok(employees);
    }

    function getDepartments() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const departments = {
        results: DEPARTMENTS
      };
      return ok(departments);
    }

    function deleteUser() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      employeesList = employeesList.filter(x => x.id !== idFromUrl());
      return ok();
    }

    // helper functions

    function ok(reqBody?) {
      return of(new HttpResponse({ status: 200, body: reqBody }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get('Authorization').indexOf(token);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1], 10);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
