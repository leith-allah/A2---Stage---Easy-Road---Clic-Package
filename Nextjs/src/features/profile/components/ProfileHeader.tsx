
"use client";

import { useRouter } from "next/navigation";

import { UserDto } from "@/server/dto/user/user.dto";


type Props = {
    user: UserDto;
};

export default function ProfileHeader({
    user,
}: Props) {

  const router = useRouter();

  async function logout() {

      await fetch("/api/auth/logout", {
          method: "POST",
      });

      window.location.href = "/";

  }

async function supprimerCompte() {

    if (

        !confirm(

            "Supprimer définitivement votre compte ?"

        )

    ) {

        return;

    }

    await fetch(

        "/api/profile/delete",

        {

            method: "PATCH",

        }

    );

    await logout();

}

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
        flex
        flex-col
        md:flex-row
        items-center
        gap-8
      "
    >

      <div
        className="
          w-32
          h-32
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          text-5xl
          font-bold
          text-blue-600
        "
      >

        {user.firstName.charAt(0)}

      </div>

      <div className="flex-1">

        <h1 className="text-4xl font-bold">

          {user.firstName} {user.lastName}

        </h1>

        <p className="text-gray-500 mt-2">

          {user.role}

        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-4">

          <div>

            <p className="text-sm text-gray-500">

              Email

            </p>

            <p className="font-semibold">

              {user.email}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Matricule

            </p>

            <p className="font-semibold">

              {user.mle}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Nationalité

            </p>

            <p className="font-semibold">

              {user.nationality}

            </p>

          </div>

        </div>

      </div>

      <div className="flex flex-col gap-4">

        <button

            onClick={supprimerCompte}

            className="
                border
                border-red-500
                bg-red-500
                text-white
                hover:bg-red-600
                px-6
                py-3
                rounded-full
                font-semibold
            "

        >

            Supprimer mon compte

        </button>

        <button

            onClick={logout}

            className="
                border
                border-red-300
                text-red-500
                hover:bg-red-50
                transition
                px-6
                py-3
                rounded-full
                font-semibold
            "

        >

            Déconnexion

        </button>

      </div>

    </div>

  );

}
