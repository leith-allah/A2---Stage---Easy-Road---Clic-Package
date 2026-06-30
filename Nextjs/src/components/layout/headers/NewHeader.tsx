
import AdminHeader
from "@/components/layout/headers/AdminHeader";

import ClientHeader
from "@/components/layout/headers/ClientHeader";

import VisitorHeader
from "@/components/layout/headers/VisitorHeader";

import { getCurrentUser }
from "@/server/auth/current-user";

export default async function NewHeader() {

    let user = null;

    try {

        user = await getCurrentUser();

    }

    catch {

        return <VisitorHeader />;

    }

    switch (user.role) {

        case "CLIENT":

            return <ClientHeader />;

        case "ADMIN":

        case "SUPER_ADMIN":

            return <AdminHeader />;

        default:

            return <VisitorHeader />;

    }

}
