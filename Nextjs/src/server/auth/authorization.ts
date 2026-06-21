
import { getCurrentUser }
from "@/server/middlewares/auth.middleware";

export async function requireRole(
  allowedRoles: string[]
) {

  const user =
    await getCurrentUser();

  if (!user) {

    throw new Error(
      "Non authentifié"
    );

  }

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {

    throw new Error(
      "Accès refusé"
    );

  }

  return user;

}
