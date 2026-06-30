
"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAuth
from "@/features/auth/hooks/useAuth";

import { Role } 
from "@/constants/roles";


type Props = {
  children: React.ReactNode;

  allowedRoles: Role[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {

  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();


  useEffect(() => {

    if (loading) {
      return;
    }

    if (!user) {

      router.replace(
        "/login"
      );

      return;
    }

    if (
      !allowedRoles.includes(
        user.role as Role
      )
    ) {

      router.replace(
        "/unauthorized"
      );

    }

  }, [
    loading,
    user,
    router,
    allowedRoles,
  ]);

  
  // Évite le flash UI
  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  if (
    !allowedRoles.includes(
      user.role as Role
    )
  ) {
    return null;
  }

  return <>{children}</>;
}
