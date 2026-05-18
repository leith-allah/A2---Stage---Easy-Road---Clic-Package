
"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard/profile",
      label: "Informations principales",
    },
    {
      href: "/dashboard/profile/personal",
      label: "Informations personnelles",
    },
    {
      href: "/dashboard/profile/security",
      label: "Sécurité",
    },
    {
      href: "/dashboard/profile/preferences",
      label: "Préférences",
    },
    {
      href: "/dashboard/profile/agency",
      label: "Agence / Entreprise",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto flex gap-8 py-10 px-6">

        {/* Sidebar */}
        <aside
          className="
            w-80
            bg-white
            rounded-3xl
            shadow-md
            p-6
            h-fit
            sticky
            top-6
          "
        >
          <h2 className="text-2xl font-bold mb-8">
            Mon Profil
          </h2>

          <nav className="flex flex-col gap-3">

            {links.map((link) => {
              const isActive =
                pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-5
                    py-4
                    rounded-2xl
                    transition
                    font-medium

                    ${
                      isActive
                        ? `
                          bg-blue-100
                          text-blue-700
                        `
                        : `
                          hover:bg-blue-50
                          hover:text-blue-600
                        `
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}

          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

      </div>
    </section>
  );
}
