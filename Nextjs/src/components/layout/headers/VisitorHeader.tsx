
import Link from "next/link";
import Image from "next/image";

export default function VisitorHeader() {

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
                    alt="Easy Road"
                    width={100}
                    height={100}
                    priority
                    className="object-contain w-auto"
                />

            </Link>

            <nav className="flex items-center gap-6">

                <Link href="/">Accueil</Link>

                <Link href="/about-us">
                    À propos
                </Link>

                <Link href="/contact">
                    Contact
                </Link>

                <Link href="/login">
                    Connexion
                </Link>

                <Link href="/register">
                    Inscription
                </Link>

            </nav>

        </header>

    );

}
