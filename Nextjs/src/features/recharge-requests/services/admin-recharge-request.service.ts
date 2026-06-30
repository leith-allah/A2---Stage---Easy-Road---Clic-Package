
export async function getAllRechargeRequests() {

  const response = await fetch(
    "/api/recharge-requests",
    {
      credentials: "include",
    }
  );

  if (!response.ok) {

    throw new Error(
      "Impossible de charger les demandes"
    );

  }

  const data =
    await response.json();

  return data.data;
}

export async function approveRechargeRequest(
  id: number
) {

  const response = await fetch(
    `/api/recharge-requests/${id}/approve`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  if (!response.ok) {

    throw new Error(
      "Validation impossible"
    );

  }

  return response.json();
}

export async function rejectRechargeRequest(
  id: number
) {

  const response = await fetch(
    `/api/recharge-requests/${id}/reject`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  if (!response.ok) {

    throw new Error(
      "Refus impossible"
    );

  }

  return response.json();
}
