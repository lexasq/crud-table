export interface Department {
  id: number;
  name: string;
}
export interface DepartmentResp {
  results: Department[];
}

export function departmentFactory(
  n = 0
): Department {
  return {
    id: n,
    name: `name${n}`
  };
}

export function departmentRespFactory(): DepartmentResp  {
  return {
    results: [departmentFactory(1), departmentFactory(2), departmentFactory(3)]
  };
}
