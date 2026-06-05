
import { Permission }
from "@/server/auth/permissions";

import { UserRole }
from "@/server/types/auth.types";

export const ROLE_PERMISSIONS:
Record<UserRole, Permission[]> = {

  ADMIN: [

    "package:create",
    "package:update",
    "package:delete",

    "booking:create",
    "booking:update",
    "booking:cancel",

    "user:create",
    "user:update",
    "user:delete",

    "wallet:topup",
    "wallet:transfer",

    "transaction:view",

    "agency:view",
    "agency:create",
    "agency:update",
    "agency:delete",

  ],

  AGENCY: [

    "booking:create",
    "booking:update",
    "booking:cancel",

    "wallet:topup",
    "wallet:transfer",

    "transaction:view",

    "agency:view",
  ],

  CLIENT: [

    "booking:create",

    "wallet:topup",

    "transaction:view",
  ],
};
