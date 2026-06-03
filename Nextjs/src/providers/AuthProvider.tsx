
"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  Role,
} from "@/constants/roles";

type User = {
  id: number;

  name: string;

  role: Role;

  suspended: boolean;
};

type AuthContextType = {
  user: User | null;

  loginAsAdmin:
    () => void;

  loginAsAgency:
    () => void;

  loginAsClient:
    () => void;

  logout:
    () => void;
};

const AuthContext =
  createContext<
    AuthContextType
      | undefined
  >(undefined);

export function
AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>({
      id: 1,

      name: "Leith",

      role: "ADMIN",

      suspended: false,
    });

  function loginAsAdmin() {

    setUser({
      id: 1,

      name: "Admin",

      role: "ADMIN",

      suspended: false,
    });
  }

  function loginAsAgency() {

    setUser({
      id: 2,

      name: "Agency",

      role: "AGENCY",

      suspended: false,
    });
  }

  function loginAsClient() {

    setUser({
      id: 3,

      name: "Client",

      role: "CLIENT",

      suspended: false,
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginAsAdmin,
        loginAsAgency,
        loginAsClient,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function
useAuthContext() {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthProvider manquant"
    );
  }

  return context;
}
