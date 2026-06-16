
export const ROLE_LEVEL = {

  CLIENT: 1,

  AGENCY: 2,

  ADMIN: 3,

  SUPER_ADMIN: 4,

  OWNER: 5,

} as const;


export function canManageRole(
  actorRole: string,
  targetRole: string
) {

  return (
    ROLE_LEVEL[
      actorRole as keyof typeof ROLE_LEVEL
    ] >

    ROLE_LEVEL[
      targetRole as keyof typeof ROLE_LEVEL
    ]
  );

}
