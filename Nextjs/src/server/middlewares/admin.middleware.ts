
import { requireRole }
from "@/server/middlewares/roles.middleware";

import { ForbiddenException }
from "@/server/exceptions/forbidden.exception";

export async function
requireAdmin() {

  const allowed =
    await requireRole([
      "ADMIN",
    ]);

  if (!allowed) {

    throw new ForbiddenException(
      "Réservé aux administrateurs"
    );
  }
}
