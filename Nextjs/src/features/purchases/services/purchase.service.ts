
import {
  Purchase,
} from "../types/purchase.types";


async function apiFetch(
  url: string,
  options?: RequestInit
) {

  const response = await fetch(
    url,
    {
      credentials: "include",

      headers: {
        "Content-Type":
          "application/json",
      },

      ...options,
    }
  );

  const data =
    await response.json();

  if (!response.ok) {

    throw new Error(
      data?.message ??
      "Erreur API"
    );

  }

  return data;
}


export async function getMyPurchases():
Promise<Purchase[]> {

  return apiFetch(
    "/api/purchases/me"
  );

}


export async function getPurchaseById(
  id: number
): Promise<Purchase> {

  return apiFetch(
    `/api/purchases/${id}`
  );

}


export async function cancelPurchase(
  id: number
) {

  return apiFetch(
    `/api/purchases/${id}/cancel`,
    {
      method: "PATCH",
    }
  );

}


export async function createPurchase(data: {

  packageId: number;

  nbVoyageurs: number;

  classeVol: string;

  typeChambre: string;

  pension: string;

}) {

  return apiFetch(

    "/api/purchases",

    {

      method: "POST",

      body: JSON.stringify(data),

    }

  );

}
