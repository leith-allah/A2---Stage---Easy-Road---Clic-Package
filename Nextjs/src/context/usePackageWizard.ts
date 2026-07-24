
"use client";

import { useContext } from "react";
import { PackageWizardContext } from "./PackageWizardContext";

export function usePackageWizard() {

    const context = useContext(PackageWizardContext);

    if (!context) {

        throw new Error(
            "usePackageWizard doit être utilisé dans PackageWizardProvider."
        );

    }

    return context;

}
