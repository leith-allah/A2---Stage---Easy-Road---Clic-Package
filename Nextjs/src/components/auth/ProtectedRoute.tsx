
"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import useAuth
  from "@/features/auth/hooks/useAuth";

import {
  Role,
} from "@/constants/roles";

type Props = {
  children:
    React.ReactNode;

  allowedRoles:
    Role[];
};

export default function
ProtectedRoute({
  children,
  allowedRoles,
}: Props) {

  const router =
    useRouter();

  const { user } =
    useAuth();

  useEffect(() => {

    // PAS CONNECTÉ
    if (!user) {

      router.replace(
        "/login"
      );

      return;
    }

    // SUSPENDU
    if (
      user.suspended
    ) {

      router.replace(
        "/forbidden"
      );

      return;
    }

    // ROLE INTERDIT
    if (
      !allowedRoles.includes(
        user.role
      )
    ) {

      router.replace(
        "/unauthorized"
      );
    }

  }, [
    user,
    router,
    allowedRoles,
  ]);

  // Évite le flash UI
  if (!user) {
    return null;
  }

  if (
    user.suspended
  ) {
    return null;
  }

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {
    return null;
  }

  return children;
}
