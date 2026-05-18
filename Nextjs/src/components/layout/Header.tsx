
import Link from "next/link";
import Image from "next/image";

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
      <Link href="/">
        <Image
          src="/logo.ico"
          alt="Clic Package Logo"
          width={100}
          height={1000}
          priority
          className="object-contain"
        />
      </Link>

      <nav className="flex gap-6">
        <Link href="/">Accueil</Link>
        <Link href="/dashboard/offers">Offres</Link>
        <Link href="/dashboard/favorites">Favoris</Link>
        <Link href="/dashboard/balance">Solde</Link>
        <Link href="/about-us">À propos</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/dashboard/profile">Profil</Link>
        <Link href="/login">Connexion</Link>
        <Link href="/register">Inscription</Link>
      </nav>
    </header>
  );
}

/*<Navbar />*/
