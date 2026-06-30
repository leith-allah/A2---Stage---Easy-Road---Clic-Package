
export async function
getMyRechargeRequests() {

  const response =
    await fetch(
      "/api/recharge-requests/me"
    );

  if (!response.ok) {

    throw new Error(
      "Erreur chargement demandes"
    );

  }

  return response.json();

}


export async function
createRechargeRequest(
  amount: number,
  comment: string
) {

  const response =
    await fetch(
      "/api/recharge-requests",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          amount,
          comment,
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

    throw new Error(
      data?.message ||
      "Erreur création demande"
    );

  }

  return data;

}
