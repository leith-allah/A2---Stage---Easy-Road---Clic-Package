
"use client";

import { createContext } from "react";
import { WizardFormData } from "@/types/package/wizard-form-data";

export interface PackageWizardContextType {

    step: number;

    data: WizardFormData;

    setData: React.Dispatch<React.SetStateAction<WizardFormData>>;

    errors: Record<string, string>;

    setErrors: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >;

    next: () => void;

    previous: () => void;

}

export const PackageWizardContext =
    createContext<PackageWizardContextType | null>(null);

    