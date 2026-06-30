
import {
  Transaction,
} from "@/features/transactions/types/transaction.types";

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
      data?.message ||
      "Erreur API"
    );

  }

  return data;

}

export async function
getTransactions() {

  const result =
    await apiFetch(
      "/api/transactions/me"
    );

  return result.data;

}
