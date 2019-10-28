import { DepartmentsService } from '../../services/departments.service';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of} from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as DepartmentsAction from './../actions/departments.action';

@Injectable()
export class DepartmentsEffect {

  @Effect()
  listDepartments$: Observable<Action> = this.actions$.pipe(
    ofType(DepartmentsAction.GET_ALL_DEPARTMENTS),
    mergeMap(() =>
      this.departmentsService.getDepartments().pipe(
        map(data => ({ type: DepartmentsAction.GET_ALL_DEPARTMENTS_SUCCESS, payload: data })),
        catchError(() => of({ type: DepartmentsAction.GET_ALL_DEPARTMENTS_FAILED }))
      )
    )
  );

  constructor(private departmentsService: DepartmentsService , private actions$: Actions) {}
}
