
export async function getFavorites() {

  const res = await fetch("/api/favorites");

  if (!res.ok) {

    throw new Error(
      "Impossible de récupérer les favoris"
    );

  }

  return res.json();

}

export async function addFavorite(
  packageId: number
) {

  const res = await fetch(

    "/api/favorites",

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        packageId,

      }),

    }

  );

  if (!res.ok) {

    throw new Error(
      "Impossible d'ajouter le favori"
    );

  }

  return res.json();

}

export async function removeFavorite(
  packageId: number
) {

  const res = await fetch(

    `/api/favorites/${packageId}`,

    {

      method: "DELETE",

    }

  );

  if (!res.ok) {

    throw new Error(
      "Impossible de supprimer le favori"
    );

  }

  return res.json();

}
