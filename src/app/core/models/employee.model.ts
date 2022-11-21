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

export function employeeFactory(
  n = 0
) {
  return {
    id: n,
    name: `name${n}`,
    active: true,
    department: n
  };
}

export function employeeRespFactory() {
  return {
    results: [employeeFactory(1), employeeFactory(2), employeeFactory(3)],
    count: 3
  };
}
