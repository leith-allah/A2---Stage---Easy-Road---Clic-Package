
"use client";

import PackageGrid from "./PackageGrid";

import {
  usePackageContext,
} from "@/providers/PackageProvider";

export default function PackagesList() {

  const {
    packages,
    loading,
  } = usePackageContext();

  if (loading) {

    return (
      <div className="text-center py-20">
        Chargement...
      </div>
    );

  }

  if (packages.length === 0) {

    return (
      <div className="text-center py-20">
        Aucun package disponible
      </div>
    );

  }

  console.log(
    "Packages Context :",
    packages
  );

  return (
    <PackageGrid
      packages={packages}
    />
  );
}
