
"use client";

import { useState } from "react";

type FavoriteButtonProps = {
  initialFavorite?: boolean;
};

export default function FavoriteButton({
  initialFavorite = false,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] =
    useState(initialFavorite);

  return (
    <button
      onClick={() =>
        setIsFavorite(!isFavorite)
      }
      className="
        bg-white
        rounded-full
        w-12
        h-12
        shadow-md
        flex
        items-center
        justify-center
        text-2xl
        hover:scale-110
        transition
      "
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
