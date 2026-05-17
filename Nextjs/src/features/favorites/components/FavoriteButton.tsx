
"use client";

import { useState } from "react";

interface FavoriteButtonProps {
  initialFavorite?: boolean;
}

export default function FavoriteButton({
  initialFavorite = false,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
  }

  return (
    <button
      onClick={toggleFavorite}
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
      {isFavorite ? (
        <span className="text-red-500">♥</span>
      ) : (
        <span className="text-black">♡</span>
      )}
    </button>
  );
}
