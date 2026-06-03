
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  fetchPackages,
} from "@/features/packages/services/package.service";

import {
  Package,
} from "@/features/packages/services/package.service";

type PackageContextType = {
  packages: Package[];

  loading: boolean;

  refresh:
    () => Promise<void>;
};

const PackageContext =
  createContext<
    PackageContextType
      | undefined
  >(undefined);

export function
PackageProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [packages, setPackages] =
    useState<Package[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {

    const data =
      await fetchPackages();

    setPackages([...data]);
  }

  useEffect(() => {

    async function load() {

      await refresh();

      setLoading(false);
    }

    load();

  }, []);

  return (
    <PackageContext.Provider
      value={{
        packages,
        loading,
        refresh,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
}

export function
usePackageContext() {

  const context =
    useContext(PackageContext);

  if (!context) {
    throw new Error(
      "PackageProvider manquant"
    );
  }

  return context;
}
