
import { NextRequest, NextResponse } from "next/server";

import { AccountRequestService }
from "@/server/services/account-request.service";

const service =
  new AccountRequestService();



export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json();

      await service.creerDemande(body);

      return NextResponse.json(
        {
          message: "Demande de création de compte envoyée avec succès.",
        },
        {
          status: 201,
        }
      );

  }

  catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        message:
          "Impossible d'envoyer la demande de création de compte.",

      },

      {

        status: 500,

      }

    );

  }

}
