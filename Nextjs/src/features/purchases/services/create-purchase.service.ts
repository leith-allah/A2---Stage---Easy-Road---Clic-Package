
export async function createPurchase(data: {
  packageId: number;

  nbVoyageurs: number;

  classeVol: string;

  typeChambre: string;

  pension: string;
}) {

  const response =
    await fetch(
      "/api/purchases",
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );

  const result =
    await response.json();

  if (!response.ok) {

    throw new Error(
      result.message ??
      "Erreur réservation"
    );

  }

  return result;
}
