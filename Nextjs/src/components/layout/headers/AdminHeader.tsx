
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


"@/features/notifications/components/NotificationBell";

export default function AdminHeader() {

    const router = useRouter();

    async function logout() {

        await fetch("/api/auth/logout", {
            method: "POST",
        });

        router.push("/");
        router.refresh();

    }

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

                <Link href="/">
                    Accueil
                </Link>

                <Link href="/dashboard/packages">
                    Packages
                </Link>

                <Link href="/dashboard/admin/packages/create">
                    Création Packages
                </Link>

                <Link href="/dashboard/admin/account-requests">
                    Demandes de comptes
                </Link>

                <Link href="/dashboard/admin/recharge-requests">
                    Demandes de rechargement
                </Link>

                <Link href="/dashboard/admin/customers">
                    Clients
                </Link>

                <Link href="/dashboard/admin/transactions">
                    Transactions
                </Link>

                <Link href="/dashboard/profile">
                    Profil
                </Link>

                <button
                    onClick={logout}
                    className="hover:text-red-500"
                >
                    Déconnexion
                </button>

            </nav>

        </header>

    );

}
