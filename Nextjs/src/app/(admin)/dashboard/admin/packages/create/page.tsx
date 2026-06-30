
import PackageCreationWizard from "@/components/packages/create/PackageCreationWizard";

export default function CreatePackagePage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Création d'un Package
        </h1>

        <p className="text-muted-foreground">
          Assistant de création étape par étape
        </p>

      </div>

      <PackageCreationWizard />

    </div>
  );
}
