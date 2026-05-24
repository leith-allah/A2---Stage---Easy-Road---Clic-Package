
export const ROLES = {
  ADMIN: "ADMIN",

  AGENCY: "AGENCY",

  CLIENT: "CLIENT",
} as const;

export type Role =
  typeof ROLES[
    keyof typeof ROLES
  ];
  