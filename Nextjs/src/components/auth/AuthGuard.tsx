
"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
} from "react";

import {
  useAuthContext,
} from "@/providers/AuthProvider";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const {
    user,
    loading,
  } = useAuthContext();

  const router =
    useRouter();

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );

    }

  }, [
    loading,
    user,
    router,
  ]);

  if (
    loading
  ) {

    return (
      <div>
        Chargement...
      </div>
    );

  }

  if (
    !user
  ) {

    return null;

  }

  return children;

}
