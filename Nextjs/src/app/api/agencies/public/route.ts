
import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  try {
    const agencies = await prisma.agence.findMany({
      include: {
        bureau_agence: true,
      },
      orderBy: {
        nom_agence: "asc",
      },
    });

    const safeAgencies = JSON.parse(
      JSON.stringify(agencies, (_, value) =>
        typeof value === "bigint" ? Number(value) : value
      )
    );

    return NextResponse.json({ success: true, data: safeAgencies });
  } catch (error) {
    console.error("Erreur chargement agences publiques:", error);
    return NextResponse.json(
      { message: "Impossible de charger la liste des agences" },
      { status: 500 }
    );
  }
}
