
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="
        w-full
        bg-white
        shadow-md
        px-8
        py-4
        flex
        justify-between
        items-center
      "
    >
      <h1 className="text-2xl font-bold text-blue-600">
        Easy Road
      </h1>

      <nav className="flex gap-6">
        <Link href="/">Accueil</Link>
        <Link href="/reservation">Réservation</Link>
        <Link href="/login">Connexion</Link>
      </nav>
    </header>
  );
}
