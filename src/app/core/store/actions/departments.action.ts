import {Action} from '@ngrx/store';

export const GET_ALL_DEPARTMENTS = '[Departments] Get all';
export const GET_ALL_DEPARTMENTS_SUCCESS = '[Country] Get all success';
export const GET_ALL_DEPARTMENTS_FAILED = '[Country] Get all failed';

export class GetAllDepartments implements Action {
  readonly type = GET_ALL_DEPARTMENTS;

  constructor() {
  }
}

export class GetAllDepartmentsSuccess implements Action {
  readonly type = GET_ALL_DEPARTMENTS_SUCCESS;

  constructor(public payload: any) {

  }
}

export class GetAllDepartmentsFailed implements Action {
  readonly type = GET_ALL_DEPARTMENTS_FAILED;

  constructor(public payload: any) {

  }
}

export type Actions = GetAllDepartments | GetAllDepartmentsSuccess | GetAllDepartmentsFailed;
