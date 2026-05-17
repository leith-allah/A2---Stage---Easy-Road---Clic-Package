
"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({
  href,
  label = "Retour",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="
        bg-white
        border
        border-gray-200
        hover:bg-gray-100
        transition
        px-6
        py-3
        rounded-full
        shadow-sm
        font-medium
      "
    >
      ← {label}
    </button>
  );
}
