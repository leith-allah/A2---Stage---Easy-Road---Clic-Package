
export const ROLES = {
  OWNER: "OWNER",

  SUPER_ADMIN: "SUPER_ADMIN",

  ADMIN: "ADMIN",

  AGENCY: "AGENCY",

  CLIENT: "CLIENT",
} as const;

export type Role =
  typeof ROLES[
    keyof typeof ROLES
  ];
  