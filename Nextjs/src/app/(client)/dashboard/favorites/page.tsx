
"use client";

import { useEffect, useState } from "react";

import PackageGrid from "@/features/packages/components/PackageGrid";

import { getFavorites }
from "@/features/favorites/services/favorite.service";

export default function FavoritesPage() {

  const [

    favorites,

    setFavorites,

  ] = useState<any[]>([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data = await getFavorites();

        setFavorites(data);

      }

      finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  if (loading) {

    return (

      <div className="p-10">

        Chargement...

      </div>

    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-10">

        ❤️ Mes Favoris

      </h1>

      {favorites.length === 0 ? (

        <div className="text-center py-20 text-gray-500">

          Vous n'avez aucun favori.

        </div>

      ) : (

        <PackageGrid

          packages={favorites}

        />

      )}

    </div>

  );

}
