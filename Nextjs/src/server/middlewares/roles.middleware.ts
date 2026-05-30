
import { getCurrentUser }
from "@/server/middlewares/auth.middleware";

import { UserRole }
from "@/server/types/auth.types";

export async function requireRole(
  allowedRoles: UserRole[]
) {
  const user =
    await getCurrentUser();

  if (!user) {
    return false;
  }

  return allowedRoles.includes(
    user.role
  );
}
