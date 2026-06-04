
import { ForbiddenException }
from "@/server/exceptions/forbidden.exception";

import { getCurrentUser }
from "@/server/middlewares/auth.middleware";

import { Permission }
from "@/server/auth/permissions";

import { ROLE_PERMISSIONS }
from "@/server/auth/roles";

export async function requirePermission(
  permission: Permission
) {

  const user =
    await getCurrentUser();

  if (!user) {

    throw new ForbiddenException(
      "Utilisateur non authentifié"
    );
  }

  const permissions =
    ROLE_PERMISSIONS[
      user.role
    ];

  const allowed =
    permissions.includes(
      permission
    );

  if (!allowed) {

    throw new ForbiddenException(
      "Permission refusée"
    );
  }

  return true;
}
