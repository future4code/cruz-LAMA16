export enum USER_ROLES {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
};

export type SignupUser = {
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
};

export type AuthenticationData = {
  id: string;
  role: USER_ROLES;
};
