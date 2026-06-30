
export async function getAccountRequests() {

    const response = await fetch(
        "/api/account-requests",
        {
            credentials: "include",
        }
    );

    if (!response.ok) {

        throw new Error(
            "Impossible de récupérer les demandes."
        );

    }

    return response.json();

}

export async function acceptAccountRequest(
    id: bigint
) {

    const response = await fetch(
        `/api/account-requests/${id}/accept`,
        {
            method: "PATCH",
            credentials: "include",
        }
    );

    if (!response.ok) {

        throw new Error(
            "Impossible d'accepter la demande."
        );

    }

    return response.json();

}

export async function rejectAccountRequest(
    id: bigint
) {

    const response = await fetch(
        `/api/account-requests/${id}/reject`,
        {
            method: "PATCH",
            credentials: "include",
        }
    );

    if (!response.ok) {

        throw new Error(
            "Impossible de refuser la demande."
        );

    }

    return response.json();

}
