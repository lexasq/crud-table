import * as DepartmentsAction from '../actions/departments.action';

// Initial default value for state
const initialState = {};

export const DEPARTMENTS_NAME = 'departments';

// Create reducer, where we catch the value
export function departmentsReducer(state = initialState, action: DepartmentsAction.Actions) {

  // inject values with actions.
  switch (action.type) {
    case DepartmentsAction.GET_ALL_DEPARTMENTS:
      return state;
    case DepartmentsAction.GET_ALL_DEPARTMENTS_SUCCESS:
      return {...action.payload};
    case DepartmentsAction.GET_ALL_DEPARTMENTS_FAILED:
      return state;
    default:
      return state;
  }
}
