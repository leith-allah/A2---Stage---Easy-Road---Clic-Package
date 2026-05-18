
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        px-6
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          shadow-xl
          p-10
          max-w-xl
          text-center
        "
      >
        <h1 className="text-6xl font-bold text-red-500">
          Oups...
        </h1>

        <h2 className="text-3xl font-bold mt-6">
          Une erreur est survenue
        </h2>

        <p className="text-gray-500 mt-4">
          Impossible de charger cette page.
          Veuillez réessayer.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">

          {/* Retry */}
          <button
            onClick={() => reset()}
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              px-6
              py-3
              rounded-full
              font-semibold
            "
          >
            Réessayer
          </button>

          {/* Home */}
          <a
            href="/"
            className="
              border
              border-gray-300
              hover:bg-gray-100
              transition
              px-6
              py-3
              rounded-full
              font-semibold
            "
          >
            Accueil
          </a>

        </div>
      </div>
    </section>
  );
}
