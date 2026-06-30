
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/features/favorites/services/favorite.service";

type FavoriteContextType = {

  favorites: number[];

  loading: boolean;

  isFavorite: (id: number) => boolean;

  toggleFavorite: (id: number) => Promise<void>;

};

const FavoriteContext =

createContext<FavoriteContextType | null>(
  null
);

export function FavoriteProvider({

  children,

}: {

  children: React.ReactNode;

}) {

  const [

    favorites,

    setFavorites,

  ] = useState<number[]>([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data = await getFavorites();

        setFavorites(

            data.map(
                (pkg:any)=>pkg.id
            )

        );

      }

      finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  function isFavorite(

    id: number

  ) {

    return favorites.includes(id);

  }

  async function toggleFavorite(

    id: number

  ) {

    if (

      favorites.includes(id)

    ) {

      await removeFavorite(id);

      setFavorites(

        favorites.filter(

          x => x !== id

        )

      );

    }

    else {

      await addFavorite(id);

      setFavorites([

        ...favorites,

        id,

      ]);

    }

  }

  return (

    <FavoriteContext.Provider

      value={{

        favorites,

        loading,

        isFavorite,

        toggleFavorite,

      }}

    >

      {children}

    </FavoriteContext.Provider>

  );

}

export function useFavoriteContext() {

  const context =

    useContext(FavoriteContext);

  if (!context)

    throw new Error(

      "FavoriteProvider manquant"

    );

  return context;

}
