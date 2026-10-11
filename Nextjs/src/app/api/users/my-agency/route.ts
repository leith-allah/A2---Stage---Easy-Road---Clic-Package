
import { successResponse } from "@/server/api/responses/success";
import { getCurrentUser } from "@/server/auth/current-user";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  const currentUser = await getCurrentUser();

  const user = await prisma.utilisateur.findUnique({
    where: {
      id_user: BigInt(currentUser.id),
    },
    include: {
      bureau_agence: {
        include: {
          agence: {
            include: {
              bureau_agence: {
                include: {
                  utilisateur: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  // 🎯 Conversion propre des BigInt en Number pour éviter le crash JSON
  const safeData = JSON.parse(
    JSON.stringify(
      {
        agency: user.bureau_agence?.agence,
        offices: user.bureau_agence?.agence?.bureau_agence || [],
      },
      (_, value) => (typeof value === "bigint" ? Number(value) : value)
    )
  );

  return successResponse(safeData);
}
