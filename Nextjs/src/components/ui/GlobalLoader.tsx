
"use client";

import useLoading
  from "@/src/hooks/useLoading";

export default function
GlobalLoader() {

  const { loading } =
    useLoading();

  if (!loading) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[99999]

        bg-black/40
        backdrop-blur-sm

        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          px-10
          py-6

          shadow-2xl

          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            w-6
            h-6

            border-4
            border-blue-500
            border-t-transparent

            rounded-full
            animate-spin
          "
        />

        <p
          className="
            text-lg
            font-semibold
          "
        >
          Chargement...
        </p>
      </div>
    </div>
  );
}
