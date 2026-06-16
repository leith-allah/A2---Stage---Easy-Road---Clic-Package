
  "use client";

  import { useMemo, useState } from "react";

  import SearchBar from "@/components/ui/SearchBar";
  import FilterBar from "@/components/ui/FilterBar";
  import UserStatusButton from "@/features/admin/users/components/UserStatusButton";

  import { USER_STATUS }
  from "@/server/constants/user-status";

  import Link from "next/link";

  export default function AgenciesPage() {
    const [search, setSearch] = useState("");

    const [filter, setFilter] =
      useState("recent");

    const [agencies, setAgencies] = useState<
      {
        id: number;
        name: string;
        matricule: string;
        country: string;
        city: string;
        users: number;
        status: "ACTIVE" | "SUSPENDED";
        createdAt: string;
        wallet: string;
      }[]
    >([

      {
        id: 1,
        name: "Travel Horizon",
        matricule: "AG-2026-001",
        country: "France",
        city: "Paris",
        users: 24,
        status: "ACTIVE",
        createdAt: "2026-01-12",
        wallet: "WAL-88421",
      },

      {
        id: 2,
        name: "Sahara Travel",
        matricule: "AG-2026-002",
        country: "Algérie",
        city: "Alger",
        users: 12,
        status: "SUSPENDED",
        createdAt: "2025-11-03",
        wallet: "WAL-99124",
      },

      {
        id: 3,
        name: "Dubai Luxury Tours",
        matricule: "AG-2026-003",
        country: "UAE",
        city: "Dubai",
        users: 41,
        status: "ACTIVE",
        createdAt: "2026-03-08",
        wallet: "WAL-11772",
      },
    ]);


    const toggleAgencyStatus = (id: number) => {
    setAgencies((prev) =>
      prev.map((agency) =>
        agency.id === id
          ? {
              ...agency,
              status:
                agency.status === "ACTIVE"
                  ? "SUSPENDED"
                  : "ACTIVE",
            }
          : agency
      )
    );
  };

    const filteredAgencies = useMemo(() => {
      let result = [...agencies];

      // SEARCH
      if (search.trim()) {
        const keyword =
          search.toLowerCase();

        result = result.filter((agency) => {
          return (
            agency.name
              .toLowerCase()
              .includes(keyword) ||
            agency.matricule
              .toLowerCase()
              .includes(keyword) ||
            agency.country
              .toLowerCase()
              .includes(keyword) ||
            agency.city
              .toLowerCase()
              .includes(keyword) ||
            agency.wallet
              .toLowerCase()
              .includes(keyword)
          );
        });
      }

      // FILTERS
      switch (filter) {
        case "recent":
          result = result.toSorted(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          );
          break;

        case "old":
          result = result.toSorted(
            (a, b) =>
              new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()
          );
          break;

        case "users-desc":
          result = result.toSorted(
            (a, b) => b.users - a.users
          );
          break;

        case "users-asc":
          result = result.toSorted(
            (a, b) => a.users - b.users
          );
          break;

        default:
          break;
      }

      return result;
    }, [agencies, search, filter]);

    return (
      <section className="min-h-screen bg-gray-100 p-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-blue-600">
              Gestion des Agences
            </h1>

            <p className="text-gray-600 mt-3 text-lg">
              Consultez et gérez toutes les
              agences partenaires.
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div
            className="
              flex
              flex-col
              xl:flex-row
              gap-4
              justify-between
              mb-10
            "
          >
            <div className="w-full xl:w-96">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="
                Rechercher une agence,
                matricule ou portefeuille...
                "
              />
            </div>

            <FilterBar
              value={filter}
              onChange={setFilter}
              options={[
                {
                  label: "Collaboration récente",
                  value: "recent",
                },

                {
                  label: "Collaboration ancienne",
                  value: "old",
                },

                {
                  label: "Plus utilisateurs",
                  value: "users-desc",
                },

                {
                  label: "Moins utilisateurs",
                  value: "users-asc",
                },
              ]}
            />
          </div>

          {/* GRID */}
          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >
            {filteredAgencies.map((agency) => (
              <div
                key={agency.id}
                className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
                hover:shadow-2xl
                transition
                flex
                flex-col
              "
              >
                {/* TOP */}
                <div
                  className="
                    flex
                    justify-between
                    items-start
                    gap-4
                  "
                >
                  <div>
                    <h2 className="text-2xl font-bold">
                      {agency.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {agency.city},{" "}
                      {agency.country}
                    </p>
                  </div>

                  <div
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold

                      ${
                        agency.status ===
                        "ACTIVE"
                          ? `
                            bg-green-100
                            text-green-700
                          `
                          : `
                            bg-red-100
                            text-red-700
                          `
                      }
                    `}
                  >
                    {agency.status ===
                    "ACTIVE"
                      ? USER_STATUS.ACTIVE
                      : USER_STATUS.SUSPENDED}
                  </div>
                </div>

                {/* INFOS */}
                <div
                  className="
                    mt-6
                    space-y-3
                    text-sm
                    text-gray-700
                  "
                >
                  <p>
                    🏢 Matricule :
                    {" "}
                    {agency.matricule}
                  </p>

                  <p>
                    👥 Utilisateurs :
                    {" "}
                    {agency.users}
                  </p>

                  <p>
                    💼 Portefeuille :
                    {" "}
                    {agency.wallet}
                  </p>

                  <p>
                    📅 Collaboration :
                    {" "}
                    {agency.createdAt}
                  </p>
                </div>

                {/* ACTIONS */}
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    mt-auto pt-8
                  "
                >
                  <Link
                    href={`/dashboard/agencies/${agency.id}`}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      transition
                      text-white
                      text-center
                      py-3
                      rounded-full
                      font-semibold
                    "
                  >
                    Voir Profil
                  </Link>

                  {/* STATUS */}
                  <UserStatusButton
                    status={agency.status}
                    onStatusChange={() => toggleAgencyStatus(agency.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY */}
          {filteredAgencies.length === 0 && (
            <div
              className="
                bg-white
                rounded-3xl
                p-16
                text-center
                shadow-md
                mt-10
              "
            >
              <h3 className="text-3xl font-bold">
                Aucun résultat
              </h3>

              <p className="text-gray-600 mt-3">
                Aucune agence trouvée.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }
