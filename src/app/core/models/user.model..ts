export interface User {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  permission: string;
  password?: string;
}

export function userFactory(
  n = 0
) {
  return {
    id: n,
    username: `test${n}`,
    firstName: `First${n}`,
    lastName: `Last${n}`,
    token: `token${n}`,
    permission: `permission${n}`,
    password: `password${n}`
  };
}
