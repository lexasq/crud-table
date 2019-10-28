export interface Employee {
  id?: number;
  name: string;
  active: boolean;
  department: number;
}
export interface EmployeeResp {
  results: Employee[];
  count: number;
}
