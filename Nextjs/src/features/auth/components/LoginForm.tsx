
"use client";

import { useState } from "react";

import { useRouter }
from "next/navigation";

import { login }
from "@/features/auth/services/auth.service";

import { useAuthContext } 
from "@/providers/AuthProvider";


export default function LoginForm() {

  const router =
    useRouter();

  const {
    refreshUser,
  } = useAuthContext();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      await login(
        email,
        password
      );

      await refreshUser();

      router.push("/");

      router.refresh();

    } catch (err: any) {

      setError(
        err.message
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >

      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        placeholder="Email"
        className="
          border
          rounded-lg
          p-3
        "
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        placeholder="Mot de passe"
        className="
          border
          rounded-lg
          p-3
        "
        required
      />

      {error && (

        <div
          className="
            text-red-600
            text-sm
          "
        >
          {error}
        </div>

      )}

      <button
        type="submit"
        disabled={loading}
        className="
          bg-blue-600
          text-white
          rounded-lg
          p-3
          hover:bg-blue-700
          transition
        "
      >

        {loading
          ? "Connexion..."
          : "Se connecter"}

      </button>

    </form>

  );

}
