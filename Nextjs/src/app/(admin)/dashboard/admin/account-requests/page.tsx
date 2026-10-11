
import { AccountRequestService } from "@/server/services/account-request.service";
import AccountRequestTable from "@/features/account-requests/components/AccountRequestTable";

export default async function AccountRequestsPage() {
  const service = new AccountRequestService();
  const rawDemandes = await service.getAllDemandes();

  // Convertit les BigInt en Number pour éviter les erreurs de sérialisation React/Next.js
  const demandes = JSON.parse(
    JSON.stringify(rawDemandes, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Demandes de Création de Compte
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Examinez, validez ou refusez les demandes d'accès d'agents et administrateurs.
        </p>
      </div>

      <AccountRequestTable demandes={demandes} />
    </main>
  );
}
