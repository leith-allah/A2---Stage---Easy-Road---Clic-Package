
"use client";

import useAuth
  from "@/src/features/auth/hooks/useAuth";

export default function
RoleSwitcher() {

  const {
    user,
    loginAsAdmin,
    loginAsAgency,
    loginAsClient,
    logout,
  } = useAuth();

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-[9999]

        bg-white
        border
        border-gray-200
        shadow-2xl

        rounded-3xl
        p-5

        w-72
      "
    >
      <h3
        className="
          font-bold
          text-lg
          mb-4
        "
      >
        Role Switcher
      </h3>

      <div
        className="
          text-sm
          text-gray-600
          mb-4
        "
      >
        Utilisateur :
        {" "}
        <span className="font-semibold">
          {user?.name || "Aucun"}
        </span>

        <br />

        Rôle :
        {" "}
        <span className="font-semibold">
          {user?.role || "-"}
        </span>
      </div>

      <div className="space-y-3">

        <button
          onClick={loginAsAdmin}
          className="
            w-full
            bg-red-500
            hover:bg-red-600
            transition

            text-white
            py-2
            rounded-full
            font-semibold
          "
        >
          Login Admin
        </button>

        <button
          onClick={loginAsAgency}
          className="
            w-full
            bg-blue-500
            hover:bg-blue-600
            transition

            text-white
            py-2
            rounded-full
            font-semibold
          "
        >
          Login Agence
        </button>

        <button
          onClick={loginAsClient}
          className="
            w-full
            bg-green-500
            hover:bg-green-600
            transition

            text-white
            py-2
            rounded-full
            font-semibold
          "
        >
          Login Client
        </button>

        <button
          onClick={logout}
          className="
            w-full
            border
            border-gray-300

            hover:bg-gray-100
            transition

            py-2
            rounded-full
            font-semibold
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
