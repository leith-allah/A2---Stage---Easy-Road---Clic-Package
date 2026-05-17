
"use client";

export default function ErrorPage({
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
      <div className="text-center max-w-xl">
        <h1 className="text-6xl font-bold text-red-500">
          Oups...
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Une erreur est survenue
        </h2>

        <p className="text-gray-600 mt-4">
          Quelque chose s’est mal passé.
          Veuillez réessayer.
        </p>

        <button
          onClick={() => reset()}
          className="
            mt-8
            bg-blue-600
            hover:bg-blue-700
            transition
            text-white
            px-8
            py-4
            rounded-full
            font-semibold
          "
        >
          Réessayer
        </button>
      </div>
    </section>
  );
}
