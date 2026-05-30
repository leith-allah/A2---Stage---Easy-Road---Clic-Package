
export type UserRole =
  | "ADMIN"
  | "AGENCY"
  | "CLIENT";

export interface AuthUser {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  role: UserRole;

  suspended: boolean;
}

export interface JwtPayload {
  sub: number;

  email: string;

  role: UserRole;
}
