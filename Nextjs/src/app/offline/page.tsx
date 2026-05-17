
import Link from "next/link";

export default function OfflinePage() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        px-6
      "
    >
      <div className="text-center max-w-xl">
        <h1 className="text-6xl mb-6">📡</h1>

        <h2 className="text-4xl font-bold">
          Pas de connexion Internet
        </h2>

        <p className="text-gray-600 mt-4">
          Vérifiez votre connexion puis
          réessayez.
        </p>

        <Link
          href="/"
          className="
            inline-block
            mt-8
            bg-blue-600
            text-white
            px-8
            py-4
            rounded-full
            font-semibold
          "
        >
          Retour à l’accueil
        </Link>
      </div>
    </section>
  );
}
