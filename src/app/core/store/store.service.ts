import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions } from './actions';
import { NAMES } from './reducers';

@Injectable()
export class StoreService {
  constructor(
  ) {
  }

  initialStoreDataForTable(store: Store<any>) {
    store.select(NAMES.departments).subscribe((resp: any) => {
      if (resp && resp.results) {
        return;
      }

      store.dispatch(new Actions.departmentsActions.GetAllDepartments());
    });
  }
}
