
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMe,
  logout,
} from "@/features/auth/services/auth.service";


type User = {
  sub: number;

  email: string;

  role:
    | "OWNER"
    | "SUPER_ADMIN"
    | "ADMIN"
    | "AGENCY"
    | "CLIENT";
};

type AuthContextType = {
  user: User | null;

  loading: boolean;

  refreshUser: () => Promise<void>;

  logoutUser: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refreshUser() {

    try {

      const me =
        await getMe();

      setUser(me);

    } catch {

      setUser(null);

    }

  }

  async function logoutUser() {

    await logout();

    setUser(null);

  }

  useEffect(() => {

    async function load() {

      await refreshUser();

      setLoading(false);

    }

    load();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "AuthProvider manquant"
    );

  }

  return context;

}
