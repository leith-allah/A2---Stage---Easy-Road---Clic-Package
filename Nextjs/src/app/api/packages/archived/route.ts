
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { prisma }
from "@/server/db/prisma";

import { PACKAGE_STATUS }
from "@/server/constants/package-status";

export async function GET() {

  await requirePermission(
    "package:view"
  );

  const packages =
    await prisma.package_voyage.findMany({

      where: {

        statut_pack:
          PACKAGE_STATUS.ARCHIVED,

      },

      orderBy: {

        id_pack: "desc",

      },

    });

  return Response.json(
    packages
  );

}
