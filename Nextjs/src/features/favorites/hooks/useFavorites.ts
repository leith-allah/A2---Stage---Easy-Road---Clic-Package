/*
"use client";

import { useEffect, useState } from "react";

import {

  fetchFavorites,
  addFavorite,
  removeFavorite,

} from "../services/favorite.service";

export function useFavorites() {

  const [favorites, setFavorites] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadFavorites();

  }, []);

  async function loadFavorites() {

    const data = await fetchFavorites();

    setFavorites(
      data.map((p: any) => p.id)
    );

    setLoading(false);

  }

  async function toggleFavorite(packageId: number) {

    if (favorites.includes(packageId)) {

      await removeFavorite(packageId);

      setFavorites((prev) =>
        prev.filter((id) => id !== packageId)
      );

    } else {

      await addFavorite(packageId);

      setFavorites((prev) => [
        ...prev,
        packageId,
      ]);

    }

  }

  function isFavorite(packageId: number) {

    return favorites.includes(packageId);

  }

  return {

    loading,

    favorites,

    isFavorite,

    toggleFavorite,

  };

}
*/