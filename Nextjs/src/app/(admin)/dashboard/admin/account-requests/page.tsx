
import { AccountRequestService }
from "@/server/services/account-request.service";

import AccountRequestTable
from "@/features/account-requests/components/AccountRequestTable";

export default async function AccountRequestsPage() {

    const service =
        new AccountRequestService();

    const demandes =
        await service.getAllDemandes();

    return (

        <main
            className="
                p-8
                space-y-8
            "
        >

            <div>

                <h1
                    className="
                        text-4xl
                        font-bold
                        text-blue-600
                    "
                >

                    Demandes de création de compte

                </h1>

                <p
                    className="
                        text-gray-500
                        mt-2
                    "
                >

                    Consultez, acceptez ou refusez les demandes.

                </p>

            </div>

            <AccountRequestTable
                demandes={demandes}
            />

        </main>

    );

}
