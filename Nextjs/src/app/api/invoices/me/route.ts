
import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { getCurrentUserId } from "@/server/auth/session";

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    // 🎯 Récupère EXCLUSIVEMENT les achats de packages de l'utilisateur connecté
    const purchases = await prisma.achat_package.findMany({
      where: {
        id_user: BigInt(userId),
      },
      include: {
        package_voyage: {
          select: {
            nom_pack: true,
            destination_pack: true,
          },
        },
      },
      orderBy: {
        date_heure_achat_pack: "desc",
      },
    });

    const invoices = purchases.map((item) => {
      const isPaid =
        item.statut_achat_pack === "CONFIRME" ||
        item.statut_achat_pack === "PAYE" ||
        item.statut_achat_pack === "SUCCES";

      return {
        id: item.ref_achat_pack || `FAC-${item.id_achat_pack}`,
        packageName: item.package_voyage?.nom_pack || "Package de voyage",
        destination: item.package_voyage?.destination_pack || "",
        amount: Number(item.total_achat_pack),
        status: isPaid ? "Payée" : "En attente",
        rawStatus: item.statut_achat_pack,
        date: item.date_heure_achat_pack,
        nbVoyageurs: item.nb_voyageurs,
      };
    });

    const safeInvoices = JSON.parse(
      JSON.stringify(invoices, (_, value) =>
        typeof value === "bigint" ? Number(value) : value
      )
    );

    return NextResponse.json({ success: true, data: safeInvoices });
  } catch (error: any) {
    console.error("Erreur récupération factures :", error);
    return NextResponse.json(
      { message: "Impossible de récupérer vos factures." },
      { status: 500 }
    );
  }
}
